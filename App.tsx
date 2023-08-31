import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";

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
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}
