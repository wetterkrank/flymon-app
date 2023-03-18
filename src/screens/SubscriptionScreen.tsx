import { Button, StyleSheet, Text, View } from "react-native";

import { SubscriptionScreenNavigationProps } from "../navigation/types";

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
