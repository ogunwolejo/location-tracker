import {StyleSheet, View} from "react-native"
import {Text} from "react-native-paper";

export default function TabTwoScreen() {
  return (
    <View style={styles.wrapper}>
      <Text variant="bodyLarge" style={styles.text}>Could not create a UI for the location history</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontWeight: 600,
    color: "white"
  }
})
