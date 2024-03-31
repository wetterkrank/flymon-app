import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import EditSubscriptionScreen from "../screens/EditSubscription";

import { RootNavigatorParamList } from "./types";

const Root = createNativeStackNavigator<RootNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <Root.Navigator>
      <Root.Screen name="Home" component={HomeScreen} />
      <Root.Screen
        name="Subscription"
        component={EditSubscriptionScreen}
        options={{ gestureEnabled: false }}
      />
    </Root.Navigator>
  );
};

export default HomeStackNavigator;
