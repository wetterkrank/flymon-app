// import { useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
// import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
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

  return (
    <DestinationInput />
  );
}

const styles = StyleSheet.create({});
