import { Pressable, StyleSheet, Text } from "react-native";
import { Subscription } from "../api/subscriptions/subscription";

export type SubscriptionCardProps = {
  data: Subscription;
  handlePress: (id: number | undefined) => void;
};

export const SubscriptionCard = ({
  data,
  handlePress,
}: SubscriptionCardProps) => {
  const result = data.search.lastResult;
  const price = result ? `${result.currency} ${result.price}` : "...";

  return (
    <Pressable style={styles.container} onPress={() => handlePress(data.id)}>
      <Text style={styles.item}>{data.search.destination}</Text>
      { price && <Text style={styles.item}>{price}</Text> }
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    height: 44,
  },
  item: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});
