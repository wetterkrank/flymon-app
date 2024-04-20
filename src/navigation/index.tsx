import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/Home";
import EditSubscriptionScreen from "../screens/EditSubscription";
import { RootStackParamList } from "./types";
import Destination from "../screens/Destination";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="EditSubscription"
          component={EditSubscriptionScreen}
        />
      </Stack.Group>
      <Stack.Group>
        <Stack.Screen name="Destination" component={Destination} />
      </Stack.Group>
    </Stack.Navigator>
  );
};
