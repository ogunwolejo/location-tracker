import {NamedExoticComponent, memo, JSX, Fragment} from "react"
import {View, StyleSheet} from "react-native"
import {useThemeColor} from "@/hooks/useThemeColor"

export const SwiperDot: NamedExoticComponent = memo((): JSX.Element => {
  const muted = useThemeColor({}, "muted")
  return (
    <Fragment>
      <View style={{...styles.dotContainer, backgroundColor: muted}} />
    </Fragment>
  )
})

export const ActiveSwiperDot: NamedExoticComponent = memo((): JSX.Element => {
  const primary = useThemeColor({}, "primary")
  return (
    <Fragment>
      <View style={{...styles.activeDotContainer, backgroundColor: primary}} />
    </Fragment>
  )
})

const styles = StyleSheet.create({
  dotContainer: {
    width: 8,
    height: 7,
    borderRadius: 4,
    marginTop: 25,
    marginLeft: 4,
    marginRight: 4,
  },
  activeDotContainer: {
    width: 22,
    height: 7,
    borderRadius: 4,
    marginTop: 25,
    marginLeft: 4,
    marginRight: 4,
  },
})
