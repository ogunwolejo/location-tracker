import {
  createContext,
  Context,
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
} from "react"
import {AppState, Platform, Linking} from "react-native"
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"

type LocationState = {
  isLoading: boolean
  error: undefined | string
  isTracking: boolean
}

type TLocationContext = {
  currentLocation: Location.LocationObject | undefined
  locations: Location.LocationObject[]
  isLoading: boolean
  error: string | undefined
  isTracking: boolean
  startTracking: () => Promise<void>
  stopTracking: () => void
}

const BACKGROUND_LOCATION_TASK = "background-location-task"

//@ts-ignore
TaskManager.defineTask(BACKGROUND_LOCATION_TASK, ({data, error}) => {
  if (error) {
    console.error("Background task error:", error)
    return
  }
  if (data) {
    const {locations} = data as {locations: Location.LocationObject[]}
    // Handle background locations here
  }
})

const LocationContext: Context<TLocationContext | undefined> = createContext<
  TLocationContext | undefined
>(undefined)

export const useLocationContext = () => {
  const ctx = useContext(LocationContext)
  if (ctx === undefined) throw Error("Location context is undefined")
  return ctx
}

export const LocationContextProvider = ({
  children,
}: PropsWithChildren): JSX.Element => {
  const [currentLocation, setCurrentLocation] = useState<
    Location.LocationObject | undefined
  >()
  const [locations, setLocations] = useState<Location.LocationObject[]>([])
  const [locationState, setLocationState] = useState<LocationState>({
    isLoading: true,
    error: undefined,
    isTracking: false,
  })
  const [foregroundSubscription, setForegroundSubscription] =
    useState<Location.LocationSubscription>()
  const [hasBackgroundPermission, setHasBackgroundPermission] =
    useState<boolean>(false)

  const handleError = (error: string) => {
    setLocationState((prev) => ({...prev, error, isLoading: false}))
    //Alert.alert("Location Error", error);
  }

  // App state changes: When the app state is in the background, we will run the location tracking as a background task else we use the foreground func
  useEffect(() => {
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    )
    return () => subscription.remove()
  }, [])

  const handleAppStateChange = async (nextAppState: string) => {
    if (nextAppState === "background" && locationState.isTracking) {
      await switchToBackgroundTracking()
    } else if (nextAppState === "active" && locationState.isTracking) {
      await switchToForegroundTracking()
    }
  }

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        // Request foreground first
        const {status: foregroundStatus} =
          await Location.requestForegroundPermissionsAsync()
        if (foregroundStatus !== "granted") {
          throw Error("Foreground location permission required")
        }

        // Then request background
        const {status: backgroundStatus} =
          await Location.requestBackgroundPermissionsAsync()
        if (backgroundStatus !== "granted") {
          throw Error("Background location permission denied")
        } else {
          setHasBackgroundPermission(backgroundStatus === "granted")
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 200,
        })
        setCurrentLocation(location)
      } catch (error: any) {
        handleError(error.message)
      } finally {
        setLocationState((prev) => ({...prev, isLoading: false}))
      }
    }

    requestPermissions()
  }, [])

  const startForegroundTracking = async () => {
    const sub: Location.LocationSubscription =
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 200, //5s
          //distanceInterval: 10,
        },
        (location) => {
          setCurrentLocation(location)
          setLocations((prev) => [...prev, location])
        },
      )
    setForegroundSubscription(sub)
  }

  const startBackgroundTracking = async () => {
    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
      accuracy: Location.Accuracy.High,
      timeInterval: 200, // 5s
      //distanceInterval: 10,
      foregroundService: {
        notificationTitle: "Location Tracking Active",
        notificationBody: "Tap to return to the app",
        notificationColor: "#FF0000",
      },
      pausesUpdatesAutomatically: false,
    })
  }

  const switchToBackgroundTracking = async () => {
    // Stop foreground tracking
    if (foregroundSubscription) {
      foregroundSubscription.remove()
      setForegroundSubscription(undefined)
    }

    // Start background tracking
    if (hasBackgroundPermission) {
      await startBackgroundTracking()
    }
  }

  const switchToForegroundTracking = async () => {
    // Stop background tracking
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK)
    // Start foreground tracking
    startForegroundTracking()
  }

  const startTracking = async () => {
    if (!hasBackgroundPermission) {
      //TODO: Show an error message
      return
    }

    setLocationState((cur) => ({...cur, isTracking: true}))
    if (AppState.currentState === "active") {
      startForegroundTracking()
    } else {
      startBackgroundTracking()
    }
  }

  const stopTracking = async () => {
    setLocationState((cur) => ({...cur, isTracking: false}))
    if (foregroundSubscription) {
      foregroundSubscription.remove()
      setForegroundSubscription(undefined)
    }
    await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK)
  }

  useEffect(() => {
    return () => {
      if (foregroundSubscription) foregroundSubscription.remove()
      Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK)
    }
  }, [])

  return (
    <LocationContext.Provider
      value={{
        currentLocation,
        locations,
        isLoading: locationState.isLoading,
        error: locationState.error,
        isTracking: locationState.isTracking,
        startTracking,
        stopTracking,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}
