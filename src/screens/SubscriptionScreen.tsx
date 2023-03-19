import { Button, StyleSheet, Text, View } from "react-native";

import { SubscriptionScreenNavigationProps } from "../navigation/types";

// Subscription parameters:
// Destination (autocomplete)
// Earliest departure date, latest return date (absolute or relative, like "tomorrow")
// Min/max days at destination
// Max stops
// Inform me when the price drops below X / by X%

export default function SubscriptionScreen({navigation}: SubscriptionScreenNavigationProps) {
  return (
    <View>
      <Text>Subscription Screen</Text>
      <Button
          title="Back to Home"
          onPress={() => navigation.navigate("Home")}
        />
    </View>
  );
}

const styles = StyleSheet.create({});
