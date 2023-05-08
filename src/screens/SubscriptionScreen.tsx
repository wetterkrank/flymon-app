import { Text } from "react-native";

import useSWRMutation from "swr/mutation";

import { SubscriptionScreenNavigationProps } from "../navigation/types";
import {
  Search,
  createSubscription,
  useSubscription,
} from "../api/subscriptions/subscription";
import { SearchForm } from "../components/SearchForm";

// Search parameters:
// origin (config), destination (autocomplete)
// earliestDeparture date, latestDepartureDate (absolute or relative, like "tomorrow")
// min/max daysAtDestination
// maxStopovers (0, 1, 2)
// notification settings ("inform me when the price drops below X")

export default function SubscriptionScreen({
  route,
  navigation,
}: SubscriptionScreenNavigationProps) {
  const { subscriptionId } = route.params;

  // Loads subscription/search from the API or creates a new one if the id is null
  const { data, isLoading, error } = useSubscription(subscriptionId);
  console.log("Subscription screen: ", data);

  const { trigger: create } = useSWRMutation("subscriptions", createSubscription);
  // const { trigger: update } = useSWRMutation("subscriptions", updateSubscription);

  const onConfirm = (search: Search) => {
    navigation.goBack();
    const newSubscription = {
      ...data,
      search: search,
    };
    create(newSubscription);
  };

  // TODO: better loading/error indication
  if (!data) {
    if (isLoading) return <Text>Loading...</Text>;
    else return <Text>Error: {error.message}</Text>;
  }
  const search = data.search;

  return <SearchForm search={search} onConfirm={onConfirm} />;
}
