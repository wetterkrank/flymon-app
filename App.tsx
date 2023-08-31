import { NavigationContainer } from "@react-navigation/native";
import { Auth0Provider } from "react-native-auth0";
import * as Notifications from 'expo-notifications';

import HomeStackNavigator from "./src/navigation/HomeStack";

export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  return (
    <Auth0Provider
      domain={"dev-wttr.eu.auth0.com"}
      clientId={"D9tpIq2LmI8ZqfiDm7ORaNXykiiA40Ff"}
    >
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    </Auth0Provider>
  );
}
