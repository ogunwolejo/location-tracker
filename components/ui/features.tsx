import {NamedExoticComponent, memo, JSX} from "react"
import {View, StyleSheet} from "react-native"
import FontAwesome from "@expo/vector-icons/FontAwesome6"
import {useThemeColor} from "@/hooks/useThemeColor"
import {Text} from "react-native-paper"

type Props = {
  fontName: string
  label: string
}

export const Features: NamedExoticComponent<Props> = memo(
  ({fontName, label}): JSX.Element => {
    const primary = useThemeColor({}, "primary")
    return (
      <View style={styles.features}>
        <View style={{...styles.feature_icon_container}}>
          <FontAwesome name={fontName} size={20} color={primary} />
        </View>
        <Text variant="bodyLarge" style={styles.label}>
          {label}
        </Text>
      </View>
    )
  },
)

const styles = StyleSheet.create({
  features: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    gap: 8,
    boxSizing: "border-box",
    width: "100%",
  },
  feature_icon_container: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
    borderRadius: 8,
  },
  label: {
    fontWeight: 600,
    textTransform: "capitalize",
    width: "100%",
  },
})
