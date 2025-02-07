import {Fragment, useState} from "react"
import {View, StyleSheet, GestureResponderEvent, ScrollView} from "react-native"
import {TextInput, Text, Button} from "react-native-paper"
import {useForm, Controller} from "react-hook-form"
import {useThemeColor} from "@/hooks/useThemeColor"
import {useRouter} from "expo-router"

type TForm = {
  password: string
  email: string
}

const EmailPasswordForm = (): JSX.Element => {
  const router = useRouter()

  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(true)
  const secureTextToggleHandle = (e: GestureResponderEvent) => {
    setSecureTextEntry((current) => !current)
  }

  const primary = useThemeColor({}, "primary")
  const inputBg = useThemeColor({}, "inputBg")

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<TForm>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const locationTrackerHandle = (e: GestureResponderEvent) =>
    router.replace("/(tabs)")

  const handleCreateAccount = (e: GestureResponderEvent) => {}

  const onSubmit = (data: TForm) => {
    console.log("Submit data: " + data)
  }

  return (
    <Fragment>
      <ScrollView
        contentContainerStyle={{...styles.form, backgroundColor: "transparent"}}
        style={{width: "100%"}}
      >
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              activeUnderlineColor={primary}
              style={{
                backgroundColor: inputBg,
              }}
              mode="flat"
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="email"
        />
        {errors.email && (
          <Text variant="labelSmall" style={styles.error_msg}>
            Email address cannot be empty
          </Text>
        )}

        <Controller
          control={control}
          rules={{
            maxLength: 100,
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              activeUnderlineColor={primary}
              style={{
                backgroundColor: inputBg,
              }}
              mode="flat"
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry={secureTextEntry}
              right={
                <TextInput.Icon
                  icon={secureTextEntry ? "eye-off" : "eye"}
                  onPress={secureTextToggleHandle}
                />
              }
            />
          )}
          name="password"
        />
        {errors.password && (
          <Text variant="labelSmall" style={styles.error_msg}>
            Password is required
          </Text>
        )}

        <Button
          mode="contained"
          buttonColor={primary}
          textColor="white"
          style={{borderRadius: 8, borderColor: "transparent"}}
          onPress={handleSubmit(onSubmit)}
        >
          <Text variant="bodyLarge" style={{color: "white", fontWeight: 800}}>
            Login
          </Text>
        </Button>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button mode="text" textColor={primary} onPress={handleCreateAccount}>
            Create account
          </Button>
          <Button
            mode="text"
            textColor={primary}
            //style={{alignSelf: "flex-end"}}
            onPress={locationTrackerHandle}
          >
            skip
          </Button>
        </View>
      </ScrollView>
    </Fragment>
  )
}

export default EmailPasswordForm

const styles = StyleSheet.create({
  form: {
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 6,
  },
  error_msg: {
    marginTop: 6,
    marginBottom: 6,
  },
})
