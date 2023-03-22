import { useState } from "react";

import { Button, StyleSheet, Switch, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
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
  const [dateToSelect, setDateToSelect] = useState<"departure" | "return" | null>(null);
  const [relativeDatesEnabled, setRelativeDatesEnabled] = useState(false);
  const toggleRelativeDates = (value: boolean) =>
    setRelativeDatesEnabled(value);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
    setDateToSelect(null);
  };

  const handleConfirm = (date: Date) => {
    const dateType = dateToSelect === "departure" ? "Earliest departure" : "Latest return";
    console.log(`${dateType} date: ${date}}`);
    hideDatePicker();
    setDateToSelect(null);
  };

  const selectDepartureDate = () => {
    setDateToSelect("departure");
    setDatePickerVisibility(true);
  };

  const selectReturnDate = () => {
    setDateToSelect("return");
    setDatePickerVisibility(true);
  };

  return (
    <View>
      {/* Pass props to the input */}
      <DestinationInput />

      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={relativeDatesEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleRelativeDates}
        value={relativeDatesEnabled}
      />

      <Button title="Earliest departure date" onPress={selectDepartureDate} />
      <Button title="Latest return date" onPress={selectReturnDate} />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

    </View>
  );
}

const styles = StyleSheet.create({});
