import {
  createContext,
  Context,
  JSX,
  PropsWithChildren,
  useState,
  useEffect,
  useContext,
} from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import {Variables} from "@/constants/variables"

type TAuth = {
  loading: boolean
  token: string | undefined
  logoutHandle: () => void
}

type TSession = {
  isLoading: boolean
  sessionToken: string | undefined
}

const AuthContext: Context<TAuth | undefined> = createContext<
  TAuth | undefined
>(undefined)

export const useAuthContext = () => {
  const authContext = useContext(AuthContext)
  if (authContext === undefined) throw new Error("Auth context is undefined")
  return authContext
}

export const AuthProvider = ({children}: PropsWithChildren): JSX.Element => {
  const [authSession, setAuthSession] = useState<TSession>({
    isLoading: true,
    sessionToken: undefined,
  })

  useEffect(() => {
    const checkAuth = () => {
      AsyncStorage.getItem(Variables.userToken, (error, token?: string) => {
        if (error) {
          console.error("Unable to get user token", error)
        }

        if (token) {
          setAuthSession((current) => ({
            ...current,
            sessionToken: token,
          }))
        }

        setAuthSession((current) => ({
          ...current,
          isLoading: false,
        }))
      })
    }

    checkAuth()
  }, [])

  const logoutHandle = () => {
    AsyncStorage.removeItem(Variables.userToken, (error) => {
      if (error) {
        console.error("Could not log out", error)
      }
    })
  }

  return (
    <AuthContext.Provider
      value={{
        loading: authSession.isLoading,
        token: authSession.sessionToken,
        logoutHandle,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
