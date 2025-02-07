import {JSX, memo, NamedExoticComponent, useState} from "react"
import {View, StyleSheet, Platform} from "react-native"
import {Text, IconButton, Button} from "react-native-paper"
import MapView, {Marker, Polyline} from "react-native-maps"
import {useLocationContext} from "@/context/location.context"
import {useThemeColor} from "@/hooks/useThemeColor"

const ToggleTrackingBtn:NamedExoticComponent = memo(() => {
  const {startTracking, stopTracking, isTracking} =useLocationContext();
  const primary = useThemeColor({}, "primary")
  return (
    !isTracking ? (
      <Button
        mode="elevated"
        style={{...styles.fab, backgroundColor: primary}}
        onPress={startTracking}
      >
       Start Tracking 
      </Button>
    ): (
      <Button
        mode="elevated"
        style={{...styles.fab, backgroundColor: primary}}
        onPress={stopTracking}
      >
       Stop Tracking 
      </Button>
    )
  );
})



export default function TrackingScreen(): JSX.Element {
  const primary = useThemeColor({}, "primary")
  const {currentLocation, locations} =
    useLocationContext();


  if (!currentLocation) {
    return <Text variant="labelLarge">Location is not definedd</Text>
  }

  return (
    <View style={styles.container}>
      <ToggleTrackingBtn/>
      <MapView
        style={styles.map}
        provider={Platform.OS === "ios" ? undefined : "google"}
        initialRegion={{
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.001,
        }}
        camera={{
          center: {
            latitude: currentLocation.coords.latitude,
            longitude: currentLocation.coords.longitude,
          },
          zoom: 20,
          altitude: 0,
          pitch: 0,
          heading: 0,
        }}
       
        cameraZoomRange={{
          minCenterCoordinateDistance: 50,  
          maxCenterCoordinateDistance: 500,           
          animated: true, 
        }}
        mapType="standard"
        showsUserLocation={true}
        showsPointsOfInterest={true} // Display shops/POIs
        showsBuildings={true}
        showsTraffic={true}
        showsIndoors={true}
        userLocationPriority="high"
        followsUserLocation={true}
      >
        <Marker
          coordinate={currentLocation.coords}
          title="Current Location"
          description="This is where you are"
          
        />
        {locations.length && (
          <Polyline
            coordinates={locations.map((loc) => loc.coords)}
            strokeColor={primary}
            strokeWidth={3}
          />
        )}
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,

    zIndex: 999,
  },
})
