import { Button, StyleSheet, Text, View } from "react-native";

import { HomeScreenNavigationProps } from '../navigation/types';
import { SubscriptionsList } from "../components/SubscriptionsList";
import { useSuspense } from "@rest-hooks/react";
import { SubscriptionResource } from "../api/subscriptions/subscription";

export default function HomeScreen({navigation}: HomeScreenNavigationProps) {
  const data = useSuspense(SubscriptionResource.getList);
  console.log(data);
  return (
    <View style={styles.container}>
      <View style={styles.destinations}>
        <SubscriptionsList data={data}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Destination"
          onPress={() => navigation.navigate("Subscription")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingVertical: "10%",
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  destinations: {
    flex: 1,
  },
  destinationCard: {
    height: 100,
    marginVertical: 10,
    backgroundColor: "lightblue",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    flex: 1,
  },
});
