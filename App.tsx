import { NavigationContainer } from "@react-navigation/native";

import HomeStackNavigator from "./src/navigation/HomeStack";

export default function App() {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
}
