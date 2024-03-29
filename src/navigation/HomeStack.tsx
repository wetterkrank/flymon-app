import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import EditSubscriptionScreen from "../screens/EditSubscriptionScreen";

import { HomeStackNavigatorParamList } from "./types";

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen
        name="Subscription"
        component={EditSubscriptionScreen}
        options={{ gestureEnabled: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
