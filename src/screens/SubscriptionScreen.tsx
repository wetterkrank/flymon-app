import { useState } from "react";
import { Button, StyleSheet, Switch, Text, View } from "react-native";
import DatePickerModal from "react-native-modal-datetime-picker";

import { DestinationInput } from "../components/DestinationInput";
import { DaysSelector } from "../components/DaysSelector";
import { StopsSelector } from "../components/StopsSelector";

import { SubscriptionScreenNavigationProps } from "../navigation/types";
import { formattedDate } from "../helpers";
import { useSubscription, newSubscription } from "../api/subscriptions/subscription";

// Search parameters:
// origin (config), destination (autocomplete)
// earliestDeparture date, latestDepartureDate (absolute or relative, like "tomorrow")
// min/max daysAtDestination
// maxStopovers (0, 1, 2)
// notification settings ("inform me when the price drops below X")

type TravelDates = {
  earliest: { value: Date | null };
  latest: { value: Date | null };
};

const defaultDates: TravelDates = {
  earliest: { value: null },
  latest: { value: null },
};

export default function SubscriptionScreen({
  route,
  navigation,
}: SubscriptionScreenNavigationProps) {
  // Loads subscription/search from API or create a new one if the id is null
  const { subscriptionId } = route.params;
  const {data, isLoading, error } = useSubscription("1", subscriptionId);

  if (!data) {
    if (isLoading) return <Text>Loading...</Text>
    else return <Text>Error: {error.message}</Text>;
  }
  const search = data.search;

  // Search parameters
  const [destination, setDestination] = useState(search.destination);
  const [travelDates, setTravelDates] = useState<TravelDates>(defaultDates);
  const [daysAtDestination, setDaysAtDestination] = useState<number[]>([
    search.minNightsAtDestination,
    search.maxNightsAtDestination,
  ]);
  const [maxStops, setMaxStops] = useState<number>(search.maxStopovers);

  // Travel dates selection
  const [dateSelectMode, setDateSelectMode] =
    useState<keyof TravelDates>("earliest");
  const [relativeDatesEnabled, setRelativeDatesEnabled] = useState(false);
  const toggleRelativeDates = (value: boolean) =>
    setRelativeDatesEnabled(value);
  const [isDatePickerVisible, setDatePickerVisibile] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibile(false);
    setDateSelectMode("earliest");
  };

  const handleSelectedDate = (date: Date) => {
    setTravelDates((prevDates) => {
      const dates = prevDates;
      dates[dateSelectMode].value = date;
      return dates;
    });
    hideDatePicker();
    setDateSelectMode("earliest");
  };

  const selectDepartureDate = () => {
    setDateSelectMode("earliest");
    setDatePickerVisibile(true);
  };

  const selectReturnDate = () => {
    setDateSelectMode("latest");
    setDatePickerVisibile(true);
  };

  // Days at destination selector
  const [isDaysSelectorVisible, setDaysSelectorVisible] = useState(false);
  const hideDaysSelector = () => setDaysSelectorVisible(false);
  const handleSelectedDays = (days: number[]) => {
    setDaysAtDestination(days);
    hideDaysSelector();
  };

  // Max stops selector
  const [isStopsSelectorVisible, setStopsSelectorVisible] = useState(false);
  const hideStopsSelector = () => setStopsSelectorVisible(false);
  const handleSelectedStops = (maxStops: number) => {
    setMaxStops(maxStops);
    hideStopsSelector();
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
        <Text>Use relative dates?</Text>
      </View>

      <Button title="Earliest departure" onPress={selectDepartureDate} />
      <Text>{`Selected: ${formattedDate(travelDates.earliest.value)}`}</Text>

      <Button title="Latest departure" onPress={selectReturnDate} />
      <Text>{`Selected: ${formattedDate(travelDates.latest.value)}`}</Text>

      <Button
        title="Days at destination"
        onPress={() => setDaysSelectorVisible(true)}
      />
      <Text>{`Days at destination: ${daysAtDestination[0]} - ${daysAtDestination[1]}`}</Text>

      <Button title="Max stops" onPress={() => setStopsSelectorVisible(true)} />
      <Text>{`Max stops: ${maxStops}`}</Text>

      <Button title="Confirm" onPress={confirmSubscription} />

      <DaysSelector
        isVisible={isDaysSelectorVisible}
        values={daysAtDestination}
        onConfirm={handleSelectedDays}
        onCancel={hideDaysSelector}
      />

      <StopsSelector
        isVisible={isStopsSelectorVisible}
        onConfirm={handleSelectedStops}
        onCancel={hideStopsSelector}
      />

      <DatePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleSelectedDate}
        onCancel={hideDatePicker}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  relativeDates: {},
});
