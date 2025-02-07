# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.




### Build a development apk

This `README.md` provides clear instructions for building an APK (or iOS build) using Expo and EAS Build along with links to video tutorials, documentation, and additional resources. You can modify or expand this file as needed for your project.

* Run this in your terminal: npx expo install expo-dev-client

## Steps to Build a Development APK

### 1. Install Dependencies
Run the following command to install the Expo Dev Client:
```sh
npx expo install expo-dev-client
```

### 2. Start Your Expo Project
```sh
npx expo start
```

### 3. Install EAS CLI
```sh
npm install -g eas-cli
```

### 4. Create an Expo Account
Go to [Expo](https://expo.dev) and create a free account.

### 5. Login to EAS
```sh
eas login
```

### 6. Initialize EAS in Your Project
```sh
eas init
```

### 7. Build for iOS (If Required)
Run this command to register your iOS device:
```sh
eas device:create
```
Follow the instructions here: [iOS Provisioning Profile](https://docs.expo.dev/tutorial/eas/ios-development-build-for-devices/#provisioning-profile)

Run the iOS build command:
```sh
eas build --platform ios --profile development
```

### 8. Build for Android
Run the following command to build the APK:
```sh
eas build --platform android --profile development
```

### 9. Start Your Expo Server (If Not Running)
```sh
npx expo start
```

### 10. Install Development Build on Your Device
Scan the development build link to install it on your phone.

### 11. Enable Developer Mode on iOS (If Needed)
Follow this guide: [Enable Developer Mode on iOS](https://docs.expo.dev/guides/ios-developer-mode/)

### 12. Android APK Testing
EAS creates an APK file for testing. More details: [Android Development Build](https://docs.expo.dev/tutorial/eas/android-development-build/)

### 13. Restart the Server If Necessary
If your server closes, restart it with:
```sh
npx expo start
```

### 14. Run Development Build on an iOS Simulator
Follow these steps: [Run on iOS Simulator](https://docs.expo.dev/build-reference/simulators/)

---


