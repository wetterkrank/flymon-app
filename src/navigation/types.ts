import type { NativeStackScreenProps } from "@react-navigation/native-stack";

export type RootNavigatorParamList = {
  Home: undefined;
  Subscription: { subscriptionId: number | undefined };
};

// possible nav routes from Home
export type HomeScreenNavProps = NativeStackScreenProps<
  RootNavigatorParamList,
  "Home"
>;

// possible nav routes from Subscription
export type EditSubscriptionScreenNavProps = NativeStackScreenProps<
  RootNavigatorParamList,
  "Subscription"
>;
