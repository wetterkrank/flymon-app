import { useEffect, useState } from "react";
import { Text } from "react-native";

import { mutate } from "swr";
import {
  VStack,
  Button,
  ButtonText,
  View,
  ButtonIcon,
  TrashIcon,
} from "@gluestack-ui/themed";

import { registerForPushNotificationsAsync } from "../services/notifications";
import { EditSubscriptionScreenNavigationProps } from "../navigation/types";
import {
  useSubscriptions,
  defaultSubscription,
  createSubscription,
  updateSubscription,
  deleteSubscription,
} from "../api/subscriptions/subscription";
import {
  SearchParams,
  searchParamsSchema,
  Subscription,
  NewSubscription,
} from "../api/subscriptions/types";
import { SearchForm } from "../components/SearchForm";
import { Spinner } from "../components/Spinner";

// Add the item to the list, replace existing one if found by id
const insertOrReplace = (
  item: Subscription,
  list: Subscription[] | undefined = []
) => {
  const otherItems = list.filter((existingItem) => existingItem.id !== item.id);
  return [...otherItems, item];
};

// NOTE: if optimistic updates turn out to be too wonky, use good old spinner while saving
const saveAndMutate = async (subscription: Subscription | NewSubscription) => {
  mutate<Subscription[]>(
    "subscriptions",
    async (list) => {
      // Wait for the subscription to be posted to the API
      const saved =
        "id" in subscription
          ? await updateSubscription(subscription)
          : await createSubscription(subscription);

      // Return the list, replacing the old one with the saved one
      return insertOrReplace(saved, list);
    },
    {
      revalidate: true,
    }
  );
};

const deleteAndMutate = async (id: number) => {
  mutate<Subscription[]>(
    "subscriptions",
    async (list = []) => {
      await deleteSubscription(id);
      return list.filter((item) => item.id !== id);
    },
    {
      optimisticData: (list = []) => list.filter((item) => item.id !== id),
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

export default function EditSubscriptionScreen({
  route,
  navigation,
}: EditSubscriptionScreenNavigationProps) {
  const { subscriptionId } = route.params;
  // NOTE: we load all subscriptions to simplify optimistic updates
  const { data: subscriptions, isLoading, error } = useSubscriptions();
  const [pushToken, setPushToken] = useState<string | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );
  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setPushToken(token));
  });

  // TODO: better loading/error indication
  if (!subscriptions) {
    if (isLoading) return Spinner();
    else return <Text>Error: {error.message}</Text>;
  }
  const subscription =
    subscriptions.find((s) => s.id === subscriptionId) || defaultSubscription();
  const searchParams = searchParamsSchema.parse(subscription.search); // only esssential data

  // NOTE: must handle 2 cases: new and updated subscription
  const onConfirm = (search: SearchParams) => {
    if (pushToken) {
      const newSubscription = { ...subscription, search, pushToken };
      saveAndMutate(newSubscription);
      navigation.goBack();
    } else {
      setErrorMessage(
        "Please allow push notifications to save the subscription"
      );
    }
  };

  const onDelete = () => {
    if ("id" in subscription) {
      deleteAndMutate(subscription.id);
      navigation.goBack();
    }
  };

  return (
    <View flex={1}>
      <VStack space="sm" justifyContent="space-between" flex={1}>
        {errorMessage && <Text>{errorMessage}</Text>}
        <View flex={0.8}>
          <SearchForm search={searchParams} onConfirm={onConfirm} />
        </View>
        <View
          flex={0.2}
          flexDirection="row"
          justifyContent="flex-end"
          $base-pl="$4"
          $base-pr="$5"
        >
          {"id" in subscription && (
            <Button onPress={onDelete} variant="link" action="negative">
              <ButtonText>Delete</ButtonText>
              <ButtonIcon as={TrashIcon}></ButtonIcon>
            </Button>
          )}
        </View>
      </VStack>
    </View>
  );
}
