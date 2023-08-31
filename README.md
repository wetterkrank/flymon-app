# Flymon mobile app

- Run the development server: `npm expo start`, or
- Make a device build: `eas build --profile development --platform ios` and `expo start --dev-client`

## Notes
- Alternative to resthooks.io -- swr or react-query + zod for schema validation
- Alternative backend options: Parse Platform, Supabase
  - authentication
  - scheduler
  - push notifications
- Auth: Auth0; Authelia, Authgear, Keycloak as alternatives; or mb Devise?
  - in fact, may be not needed at all, we can generate a UUID and store it:
  - [NSUbiquitousKeyValueStore or UserDefaults](https://developer.apple.com/documentation/storekit/in-app_purchase/original_api_for_in-app_purchase/persisting_a_purchase/#3510886)
  - see [this package](https://react-native-cloud-store.vercel.app/docs/introduction) for NSUbiquitousKeyValueStore
  - or Expo SecureStore (uses KeyChain services, persistent across installs)
  - AsyncStorage also supports iCloud backup
  - to unlock the features, use In-App Purchases
- Router options: React Navigation, React Native Navigation, Expo Router
- Build & release: fastlane.tools?
- Backend deploy tool: coolify
- Alternative to React Native in principle: Capacitor?
- Shopify Flashlist instead of FlatList
- Server-side push notifications:
  - https://github.com/ostinelli/apnotic
  - https://github.com/rpush/rpush
