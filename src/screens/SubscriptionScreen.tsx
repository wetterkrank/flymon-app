import { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { DestinationInput } from "../components/DestinationInput";

import { SubscriptionScreenNavigationProps } from "../navigation/types";

// Subscription parameters:
// Destination (autocomplete)
// Earliest departure date, latest return date (absolute or relative, like "tomorrow")
// Min/max days at destination
// Max stops
// Inform me when the price drops below X / by X%

export default function SubscriptionScreen({
  navigation,
}: SubscriptionScreenNavigationProps) {
  // const [selectedItem, setSelectedItem] = useState({});
  const [relativeDatesEnabled, setRelativeDatesEnabled] = useState(false);
  const toggleRelativeDates = (value: boolean) => setRelativeDatesEnabled(value);

  return (
    <View>

      <DestinationInput />

      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={relativeDatesEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleRelativeDates}
        value={relativeDatesEnabled}
      />

      <Text>Earliest departure date</Text>
      <Text>Latest return date</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
