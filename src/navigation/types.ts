import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type HomeStackNavigatorParamList = {
  Home: undefined;
  Subscription: { subscriptionId: string | undefined };
};

// possible nav routes from Home
export type HomeScreenNavigationProps = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  "Home"
>;

// possible nav routes from Subscription
export type SubscriptionScreenNavigationProps = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  "Subscription"
>;
