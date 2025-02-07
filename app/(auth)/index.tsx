import {
  View,
  StyleSheet,
  SafeAreaView,
  useWindowDimensions,
  ImageBackground,
  GestureResponderEvent,
} from "react-native"
import Swiper from "react-native-swiper"
import {Fragment, memo, NamedExoticComponent} from "react"
import {useThemeColor} from "@/hooks/useThemeColor"
import {Text, Button} from "react-native-paper"
import {Features} from "@/components/ui/features"
import {SwiperDot, ActiveSwiperDot} from "@/components/ui/swiper-dot"
import FontAwesome6 from "@expo/vector-icons/FontAwesome6"
//import EmailPasswordForm from "@/components/ui/form"
import {useRouter} from "expo-router"

const WelcomeScreen = (): JSX.Element => {
  const {height, width} = useWindowDimensions()
  const background = useThemeColor({}, "background")

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{...styles.slides, backgroundColor: background}}>
        <ImageBackground
          source={require("@/assets/images/mapss.png")}
          style={{...styles.image_wrapper}}
          resizeMode="cover"
        />

        <View style={{...styles.container, height: height * 0.4, width}}>
          <Swiper
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            showsButtons={false}
            dot={<SwiperDot />}
            activeDot={<ActiveSwiperDot />}
            showsPagination={true}
            paginationStyle={{
              backgroundColor: "transparent",
            }}
            autoplay={false}
          >
            <LiveTracker />
            <LocationHistory />
          </Swiper>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default WelcomeScreen

const LiveTracker: NamedExoticComponent = memo((): JSX.Element => {
  const primary = useThemeColor({}, "primary")
  const muted = useThemeColor({}, "muted")

  return (
    <Fragment>
      <View style={{justifyContent: "flex-start", gap: 8}}>
        <Text
          variant="headlineSmall"
          style={{color: primary, ...styles.header}}
        >
          Go Tracker
        </Text>
        <Text
          variant="bodySmall"
          style={{color: muted, ...styles.header, fontStyle: "italic"}}
        >
          We ensure your safety as well as providing awareness with regards to
          your location
        </Text>
      </View>

      <Text
        variant="labelLarge"
        style={{fontFamily: "700", marginTop: 18, marginBottom: 8}}
      >
        Features
      </Text>
      <View
        style={{
          flexDirection: "column",
          justifyContent: "flex-start",
          gap: 15,
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        <Features fontName="map-pin" label="Real time tracking" />
        <Features fontName="location-arrow" label="Seek Direction" />
        <Features fontName="clock" label="Location history" />
        <Features fontName="bell" label="Receive Notifications" />
      </View>
    </Fragment>
  )
})

const LocationHistory: NamedExoticComponent = memo((): JSX.Element => {
  const primary = useThemeColor({}, "primary")
  const muted = useThemeColor({}, "muted")
  const router = useRouter()
  const locationTrackerHandle = (e: GestureResponderEvent) =>
    router.replace("/(tabs)")

  return (
    <Fragment>
      <View style={{justifyContent: "flex-start", gap: 8}}>
        <Text
          variant="headlineSmall"
          style={{color: primary, ...styles.header}}
        >
          Go Tracker
        </Text>
        <Text
          variant="bodySmall"
          style={{color: muted, ...styles.header, fontStyle: "italic"}}
        >
          Revisiting your previous locations
        </Text>
      </View>

      
      <View
        style={{flexGrow: 1, justifyContent: "flex-end", marginTop: 15}}
      >
        <Button
            mode="text"
            textColor={primary}
            style={{alignSelf: "flex-end"}}
            onPress={locationTrackerHandle}
          >
            skip
          </Button>

      </View>
    </Fragment>
  )
})

const styles = StyleSheet.create({
  image_wrapper: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  login_container: {
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
    width: "100%",
  },
  container: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "white",
    padding: 20,
  },
  slides: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  header: {
    fontWeight: 700,
  },
})
