import {Client, Account} from "react-native-appwrite"

const client: Client = new Client()
  .setProject(process.env.EXPO_PUBLIC_PROJECT_ID)
  .setPlatform(process.env.EXPO_PUBLIC_PLATFORM_ID)

const account: Account = new Account(client)

export {client, account}
