import {JSX, useState} from "react"
import {View, StyleSheet, Platform} from "react-native"
import {Text} from "react-native-paper"
import MapView, {Marker, Polyline} from "react-native-maps"
import * as Location from "expo-location"
import {useLocationContext} from "@/context/location.context"

export default function TrackingScreen(): JSX.Element {
  const {currentLocation, startTracking, stopTracking, isTracking} =
    useLocationContext()
  // const {location} = useLocationContext()
  // const [routeCoordinates, setRouteCoordinates] = useState<Array<any>>([])

  // Location.watchPositionAsync(
  //   {
  //     accuracy: Location.Accuracy.High,
  //     timeInterval: 2000, // 2 seconds (2000ms)
  //     distanceInterval: 10, // 10 meters
  //   },
  //   (location) => {
  //     setRouteCoordinates((prev) => [...prev, location])
  //   },
  // )

  if (!currentLocation) {
    return <Text variant="labelLarge">Location is not definedd</Text>
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={Platform.OS === "ios" ? undefined : "google"}
        initialRegion={{
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.9,
          longitudeDelta: 0.9,
        }}
        camera={{
          center: {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          },
          zoom: 20,
          altitude: 100,
          pitch: 0,
          heading: 0,
        }}
        initialCamera={{
          center: {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          },
          zoom: 20,
          altitude: 100,
          pitch: 0,
          heading: 0,
        }}
        cameraZoomRange={{minZoom: 19, maxZoom: 20}}
        mapType="standard"
        showsUserLocation={true}
        showsPointsOfInterest={true} // Display shops/POIs
        showsBuildings={true}
        showsTraffic={true}
        showsIndoors={true}
        userLocationPriority="high"
        followsUserLocation={true}
        userLocationUpdateInterval={5000}
        //onUserLocationChange={handleUserLocationChange}
      >
        {/* <Polyline
          coordinates={routeCoordinates}
          strokeWidth={6}
          strokeColor="#4285F4"
          strokeColors={["#7F0000"]}
        /> */}
        {/* <Marker
          coordinate={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          title="current location"
        /> */}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
})
