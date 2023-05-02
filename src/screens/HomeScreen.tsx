import { Button, StyleSheet, Text, View } from "react-native";

import { HomeScreenNavigationProps } from "../navigation/types";
import { SubscriptionsList } from "../components/SubscriptionsList";
import { useSubscriptions } from "../api/subscriptions/subscription";

export default function HomeScreen({ navigation }: HomeScreenNavigationProps) {
  const { data, isLoading, error } = useSubscriptions();

  return (
    <View style={styles.container}>
      <View style={styles.destinations}>
        <SubscriptionsList data={data} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Destination"
          onPress={() => {
            navigation.navigate("Subscription", { subscriptionId: null });
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
