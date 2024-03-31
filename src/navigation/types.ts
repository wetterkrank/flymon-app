import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackNavigatorParamList = {
  Home: undefined;
  Subscription: { subscriptionId: number | undefined };
};

// possible nav routes from Home
export type HomeScreenNavProps = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  "Home"
>;

// possible nav routes from Subscription
export type EditSubscriptionScreenNavProps = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  "Subscription"
>;
