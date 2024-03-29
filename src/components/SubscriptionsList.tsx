import { FlatList, ListRenderItem } from "react-native";

import { SubscriptionCard } from "./SubscriptionCard";
import { Subscription } from "../api/subscriptions/types";
import { refreshSubscriptions } from "../api/subscriptions/subscription";

export type SubscriptionsListProps = {
  data: Subscription[];
  handlePress: (id: number | undefined) => void;
};

export const SubscriptionsList = ({
  data,
  handlePress,
}: SubscriptionsListProps) => {
  const renderItem: ListRenderItem<Subscription> = ({ item }) => (
    <SubscriptionCard data={item} handlePress={handlePress} />
  );
  // TODO: make sure new items also have ids
  const keyExtractor = (item: Subscription) => item.id?.toString() || "new";

  // TODO: why does it make 2 API calls??
  const { trigger, isMutating } = refreshSubscriptions();

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      onRefresh={trigger}
      refreshing={isMutating}
    />
  );
};
