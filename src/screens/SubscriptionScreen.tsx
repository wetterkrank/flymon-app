import { useState } from "react";
import { Button, StyleSheet, Switch, Text, View } from "react-native";
import DatePickerModal from "react-native-modal-datetime-picker";

import { DestinationInput } from "../components/DestinationInput";
import { DaysSelector } from "../components/DaysSelector";

import { SubscriptionScreenNavigationProps } from "../navigation/types";

// Subscription parameters:
// Destination (autocomplete)
// Earliest departure date, latest return date (absolute or relative, like "tomorrow")
// Min/max days at destination
// Max stops
// Inform me when the price drops below X / by X%

type TravelDates = {
  outbound: { value: Date | null };
  inbound: { value: Date | null };
};

const defaultDates: TravelDates = {
  outbound: { value: null },
  inbound: { value: null },
};

export default function SubscriptionScreen({
  navigation,
}: SubscriptionScreenNavigationProps) {
  // Subscription parameters
  const [destination, setDestination] = useState({});
  const [travelDates, setTravelDates] = useState<TravelDates>(defaultDates);
  const [daysAtDestination, setDaysAtDestination] = useState<number[]>([7, 14]);
  const [maxStops, setMaxStops] = useState<number>(0);

  // Travel dates selection
  // TODO: use TravelDates keys:
  const [dateSelectMode, setDateSelectMode] = useState<"outbound" | "inbound">(
    "outbound"
  );
  const [relativeDatesEnabled, setRelativeDatesEnabled] = useState(false);
  const toggleRelativeDates = (value: boolean) =>
    setRelativeDatesEnabled(value);
  const [isDatePickerVisible, setDatePickerVisibile] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibile(false);
    setDateSelectMode("outbound");
  };

  const handleSelectedDate = (date: Date) => {
    setTravelDates((prevDates) => {
      const dates = prevDates;
      dates[dateSelectMode].value = date;
      return dates;
    });
    hideDatePicker();
    setDateSelectMode("outbound");
  };

  const selectDepartureDate = () => {
    setDateSelectMode("outbound");
    setDatePickerVisibile(true);
  };

  const selectReturnDate = () => {
    setDateSelectMode("inbound");
    setDatePickerVisibile(true);
  };

  // Days at destination selector
  const [isDaysSelectorVisible, setDaysSelectorVisible] = useState(false);
  const hideDaysSelector = () => setDaysSelectorVisible(false);
  const handleSelectedDays = (days: number[]) => {
    setDaysAtDestination(days);
    hideDaysSelector();
  };

  // Confirm subscription
  const confirmSubscription = () => {
    // Create / update subscription on server
    navigation.navigate("Home");
  };

  return (
    <View>
      {/* Pass props to the input */}
      <DestinationInput />

      <View style={styles.relativeDates}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={relativeDatesEnabled ? "#f5dd4b" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleRelativeDates}
          value={relativeDatesEnabled}
        />
        <Text>"Use relative dates?"</Text>
      </View>

      <Button title="Earliest departure" onPress={selectDepartureDate} />
      <Text>{`Selected: ${travelDates.outbound.value}`}</Text>

      <Button title="Latest return" onPress={selectReturnDate} />
      <Text>{`Selected: ${travelDates.inbound.value}`}</Text>

      <Button
        title="Days at destination"
        onPress={() => setDaysSelectorVisible(true)}
      />

      <Button title="Confirm" onPress={confirmSubscription} />

      <DatePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleSelectedDate}
        onCancel={hideDatePicker}
      />

      <DaysSelector
        isVisible={isDaysSelectorVisible}
        values={daysAtDestination}
        onConfirm={handleSelectedDays}
        onCancel={hideDaysSelector}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  relativeDates: {},
});
