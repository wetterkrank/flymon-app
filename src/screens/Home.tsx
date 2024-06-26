import { Button, StyleSheet, Text, View } from "react-native";

import { RootStackScreenProps } from "../navigation/types";
import { SubscriptionsList } from "../components/SubscriptionsList";
import { useSubscriptions } from "../api/subscriptions/subscription";
import { Spinner } from "../components/Spinner";

export default function HomeScreen({ navigation }: RootStackScreenProps<'Home'>) {
  const { data, isLoading, error: dataError } = useSubscriptions();

  // TODO: separate existing and new subscription types? then we won't need undefined here
  const editSubscription = (id: number | undefined) => {
    id && navigation.navigate("EditSubscription", { subscriptionId: id });
  };

  // TODO: better loading/error indication
  if (!data) {
    if (isLoading) return Spinner();
    else return <Text>Error: {dataError.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.destinations}>
        <SubscriptionsList data={data} handlePress={editSubscription} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Destination"
          onPress={() => {
            navigation.navigate("EditSubscription", { subscriptionId: undefined });
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
    flex: 3,
  },
  buttonContainer: {
    justifyContent: "center",
    flex: 1,
  },
});
