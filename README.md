# Flymon mobile app

- Run the development server: `npm expo start`, or
- Make a device build: `eas build --profile development --platform ios` and `expo start --dev-client`

## Notes
- Alternative to resthooks.io -- swr or react-query + zod for schema validation
- Alternative backend options: Parse Platform, Supabase
  - authentication
  - scheduler
  - push notifications
- Auth: Auth0; Authelia or Authgear alternatives; or mb Devise?
- Router options: React Navigation, React Native Navigation, Expo Router
- Build & release: fastlane.tools?
- Backend deploy tool: coolify
- Alternative to React Native in principle: Capacitor?
- Shopify Flashlist instead of FlatList
