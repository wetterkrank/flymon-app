import { useEffect, useState } from "react";
import { Text, View } from "react-native";

import { mutate } from "swr";

import { registerForPushNotificationsAsync } from "../services/notifications";
import { SubscriptionScreenNavigationProps } from "../navigation/types";
import {
  Search,
  Subscription,
  defaultSubscription,
  saveSubscription,
  useSubscriptions,
} from "../api/subscriptions/subscription";
import { SearchForm } from "../components/SearchForm";

// If item has id, find corresponding item and replace it
// If no id (new unsaved) or id not found (new saved item), add it to the list
const insertOrReplace = (
  item: Subscription,
  list: Subscription[] | undefined = []
) => {
  const otherItems = list.filter(existingItem => existingItem.id !== item.id)
  return [...otherItems, item]
};

// NOTE: if optimistic updates turn out to be too wonky, use good old spinner while saving
const saveAndMutate = async (newSubscription: Subscription) => {
  mutate<Subscription[]>(
    "subscriptions",
    async (list) => {
      // Wait for the subscription to be posted to the API
      const saved = await saveSubscription(newSubscription);
      // Return the list, replacing the old one with the saved one
      return insertOrReplace(saved, list);
    },
    {
      // Provide the expected list for immediate display
      optimisticData: (list: Subscription[]) =>
        insertOrReplace(newSubscription, list),
      // Don't revalidate the list -- we updated it already
      revalidate: false,
    }
  );
};

// Search parameters:
// origin (set by config), destination (autocomplete search)
// earliestDeparture date, latestDepartureDate (absolute or relative, like "tomorrow")
// min/max daysAtDestination
// maxStopovers (0, 1, 2)
// notification settings ("inform me when the price drops below X")

export default function SubscriptionScreen({
  route,
  navigation,
}: SubscriptionScreenNavigationProps) {
  const { subscriptionId } = route.params;
  // NOTE: we load all subscriptions to simplify optimistic updates
  const { data: subscriptions, isLoading, error } = useSubscriptions();
  const [pushToken, setPushToken] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setPushToken(token));
  });


  // TODO: better loading/error indication
  if (!subscriptions) {
    if (isLoading) return <Text>Loading...</Text>;
    else return <Text>Error: {error.message}</Text>;
  }
  const subscription =
    subscriptions.find((s) => s.id === subscriptionId) || defaultSubscription();
  const search = subscription.search;

  // NOTE: must handle 2 cases: new and updated subscription
  const onConfirm = (search: Search) => {
    if (pushToken) {
      const newSubscription = { ...subscription, search, pushToken };
      saveAndMutate(newSubscription);
      navigation.goBack();
    } else {
      setErrorMessage('Please allow push notifications to save the subscription')
    }
  };

  return (
    <View>
      <Text>{errorMessage && errorMessage}</Text>
      <SearchForm search={search} onConfirm={onConfirm} />
    </View>
  );
}
