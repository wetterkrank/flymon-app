import { Button, StyleSheet, Text, View } from "react-native";

import { HomeScreenNavigationProps } from "../navigation/types";
import { SubscriptionsList } from "../components/SubscriptionsList";
import { useSubscriptions } from "../api/subscriptions/subscription";

export default function HomeScreen({ navigation }: HomeScreenNavigationProps) {
  const { data, isLoading, error } = useSubscriptions();

  // TODO: separate existing and new subscription types? then we won't need undefined here
  const editSubscription = (id: string | undefined) => {
    id && navigation.navigate("Subscription", { subscriptionId: id });
  };

  // TODO: better loading/error indication
  if (!data) {
    if (isLoading) return <Text>Loading...</Text>;
    else return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.destinations}>
        <SubscriptionsList data={data} handlePress={editSubscription}/>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Destination"
          onPress={() => {
            navigation.navigate("Subscription", { subscriptionId: undefined });
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
