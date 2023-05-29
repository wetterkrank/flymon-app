import React from "react";
import { FlatList, ListRenderItem, StyleSheet, Text, View } from "react-native";
import { SubscriptionCard } from "./SubscriptionCard";
import { Subscription } from "../api/subscriptions/subscription";

export type SubscriptionsListProps = {
  data: Subscription[];
  handlePress: (id: string | undefined) => void;
};

export const SubscriptionsList = ({
  data,
  handlePress,
}: SubscriptionsListProps) => {
  const renderItem: ListRenderItem<Subscription> = ({ item }) => (
    <SubscriptionCard data={item} handlePress={handlePress} />
  );

  return <FlatList data={data} renderItem={renderItem} />;
};

const styles = StyleSheet.create({});
