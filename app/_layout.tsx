import {DarkTheme, DefaultTheme, ThemeProvider} from "@react-navigation/native"
import {useFonts} from "expo-font"
import {Stack} from "expo-router"
import * as SplashScreen from "expo-splash-screen"
import {StatusBar} from "expo-status-bar"
import {useEffect, JSX} from "react"
import "react-native-reanimated"

import {useColorScheme} from "@/hooks/useColorScheme"
import {AuthProvider, useAuthContext} from "@/context/auth.context"
import {
  LocationContextProvider,
  useLocationContext,
} from "@/context/location.context"

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

function Root() {
  const colorScheme = useColorScheme()
  const {loading, token} = useAuthContext()
  const {isLoading} = useLocationContext()
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  })

  useEffect(() => {
    if (loaded && !loading && !isLoading) {
      SplashScreen.hideAsync()
    }
  }, [loaded, loading, isLoading])

  if (!loaded) {
    return null
  }

  //console.log(location);

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack initialRouteName={token ? "(tabs)" : "(auth)"}>
        <Stack.Screen name="(tabs)" options={{headerShown: false}} />
        <Stack.Screen name="(auth)" options={{headerShown: false}} />
        <Stack.Screen name="+not-found" options={{headerShown: false}} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  )
}

export default function RootLayout(): JSX.Element {
  return (
    <LocationContextProvider>
      <AuthProvider>
        <Root />
      </AuthProvider>
    </LocationContextProvider>
  )
}
