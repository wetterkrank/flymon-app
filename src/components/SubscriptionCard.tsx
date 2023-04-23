import {StyleSheet, Text, View} from 'react-native';
import { Subscription } from '../api/subscriptions/subscription';

export type SubscriptionCardProps = {
  data: Subscription
};

export const SubscriptionCard = ({data}: SubscriptionCardProps) => {
  console.log(data.search.destination);
  console.log(data.search.lastResult);
  return (
    <View style={styles.container}>
      <Text style={styles.item}>{data.search.destination}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000',
    height: 44
  },
  item: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },

});