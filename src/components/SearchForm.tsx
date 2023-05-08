import { useState } from "react";
import { Button, StyleSheet, Switch, Text, View } from "react-native";
import DatePickerModal from "react-native-modal-datetime-picker";

import { DestinationInput } from "../components/DestinationInput";
import { DaysSelector } from "../components/DaysSelector";
import { StopsSelector } from "../components/StopsSelector";

import { formattedDate } from "../helpers";
import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { Search } from "../api/subscriptions/subscription";

type TravelDates = {
  earliest: Date;
  latest: Date;
};

type SearchFormProps = {
  search: Search;
  onConfirm: (search: Search) => void;
};

export const SearchForm = ({ search, onConfirm }: SearchFormProps) => {
  // Search parameters
  const [destination, setDestination] = useState(search.destination);
  const onDestinationSelect = (selection: TAutocompleteDropdownItem) => {
    console.log("Selected destination: ", selection);
    setDestination(selection?.title || "???");
  };
  const [travelDates, setTravelDates] = useState<TravelDates>({
    earliest: search.earliestDepartureDate,
    latest: search.latestDepartureDate,
  });
  const [nightsAtDestination, setNightsAtDestination] = useState<number[]>([
    search.minNightsAtDestination,
    search.maxNightsAtDestination,
  ]);
  const [maxStopovers, setMaxStopovers] = useState<number>(search.maxStopovers);

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
      dates[dateSelectMode] = date;
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
    setNightsAtDestination(days);
    hideDaysSelector();
  };

  // Max stops selector
  const [isStopsSelectorVisible, setStopsSelectorVisible] = useState(false);
  const hideStopsSelector = () => setStopsSelectorVisible(false);
  const handleSelectedStops = (maxStops: number) => {
    setMaxStopovers(maxStops);
    hideStopsSelector();
  };

  return (
    <View>
      <DestinationInput current={destination} onSelect={onDestinationSelect} />
      <Text style={{ color: "#668", fontSize: 13 }}>
        Selected destination: {destination}
      </Text>

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
      <Text>{`Selected: ${formattedDate(travelDates.earliest)}`}</Text>

      <Button title="Latest departure" onPress={selectReturnDate} />
      <Text>{`Selected: ${formattedDate(travelDates.latest)}`}</Text>

      <Button
        title="Days at destination"
        onPress={() => setDaysSelectorVisible(true)}
      />
      <Text>{`Days at destination: ${nightsAtDestination[0]} - ${nightsAtDestination[1]}`}</Text>

      <Button title="Max stops" onPress={() => setStopsSelectorVisible(true)} />
      <Text>{`Max stops: ${maxStopovers}`}</Text>

      <Button
        title="Confirm"
        onPress={() => {
          const search = {
            origin: "BER",
            destination: destination,
            earliestDepartureDate: travelDates.earliest,
            latestDepartureDate: travelDates.latest,
            minNightsAtDestination: nightsAtDestination[0],
            maxNightsAtDestination: nightsAtDestination[1],
            maxStopovers: maxStopovers,
            lastResult: null,
          };
          onConfirm(search);
        }}
      />

      <DaysSelector
        isVisible={isDaysSelectorVisible}
        values={nightsAtDestination}
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
};

const styles = StyleSheet.create({
  relativeDates: {},
});
