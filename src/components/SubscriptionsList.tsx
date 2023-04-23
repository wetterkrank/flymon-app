
import React from 'react';
import {FlatList, ListRenderItem, StyleSheet, Text, View} from 'react-native';
import { SubscriptionCard } from './SubscriptionCard';
import { Subscription } from '../api/subscriptions/subscription';


export type SubscriptionsListProps = {
  data: Subscription[];
};

const renderItem: ListRenderItem<Subscription> = ({item}) => <SubscriptionCard data={item} />;

export const SubscriptionsList = ( {data}: SubscriptionsListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
      />
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%'
  }
});
