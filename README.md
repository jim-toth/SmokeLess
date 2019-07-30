# SmokeLess

SmokeLess is a mobile application to aid users in their journey to smoke less tobacco or to become totally tobacco free.  Currently Android only.

## Development Requirements
- Node 10
- [Expo Android App](https://play.google.com/store/apps/details?id=host.exp.exponent)

## Dependencies
- [Expo](https://expo.io/)
- [React Native 32](https://facebook.github.io/react-native/docs/0.32)

## Install
- `npm i`
- Note: you may want/need to [install the expo cli](https://docs.expo.io/versions/v34.0.0/introduction/installation/) `npm i -g expo-cli`

## Run
1. `npm start` will launch a packager on localhost which packages the app, watches for changes, and forwards to the Expo development app
2. Open the Expo app on an emulator or android device and point to your local packager (scan the QR code, etc.)
3. Code!  There is a built-in watcher that pushes changes to the expo client.

## Build
- If you'd like to build an APK run `npm run buildandroidapk`
  * If the above fails check the Expo documentation [here](https://docs.expo.io/versions/v34.0.0/distribution/building-standalone-apps/)
- Expo will build the app and generate a link where you can download the APK and install on your phone.  Make sure you have third party APK installations enabled.

## Contributing
- Create a merge request on gitlab pointing to the current prerelease branch (Currently: `MVP`)

## Resources
- [Expo Documentation](https://docs.expo.io/versions/latest/)
- [React Native 32 Documentation](https://facebook.github.io/react-native/docs/0.32)
