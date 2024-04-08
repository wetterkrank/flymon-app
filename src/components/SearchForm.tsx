import { useEffect, useState } from "react";
import { Button, Text } from "react-native";
import DatePickerModal from "react-native-modal-datetime-picker";

import { DestinationInputItem, DestinationInput } from "./DestinationInput";
import { DaysSelector } from "../components/DaysSelector";
import { StopsSelector } from "../components/StopsSelector";

import { formattedDate } from "../helpers";
// import { TAutocompleteDropdownItem } from "react-native-autocomplete-dropdown";
import { SearchParams } from "../api/subscriptions/types";
import { View } from "@gluestack-ui/themed";
import { EditSubscriptionScreenNavProps } from "../navigation/types";
// import Autocomplete from "./Autocomplete/Autocomplete";

type TravelDates = {
  earliest: Date;
  latest: Date;
};

type SearchFormProps = {
  search: SearchParams;
  navigation: EditSubscriptionScreenNavProps["navigation"];
  onConfirm: (search: SearchParams) => void;
};

export const SearchForm = ({
  search,
  navigation,
  onConfirm,
}: SearchFormProps) => {
  // Search parameters
  const [destination, setDestination] = useState(search.destination);
  const onDestinationSelect = (selection: DestinationInputItem) => {
    // console.log("Selected destination: ", selection);
    setDestination(selection.code);
  };
  const [travelDates, setTravelDates] = useState<TravelDates>({
    earliest: search.earliestDepartureDate,
    latest: search.latestDepartureDate,
  });
  const [nightsAtDestination, setNightsAtDestination] = useState<
    [number, number]
  >([search.minNightsAtDestination, search.maxNightsAtDestination]);
  const [maxStopovers, setMaxStopovers] = useState<number>(search.maxStopovers);

  // Travel dates selection
  const [dateSelectMode, setDateSelectMode] =
    useState<keyof TravelDates>("earliest");

  const [isDatePickerVisible, setDatePickerVisibile] = useState(false);

  const hideDatePicker = () => {
    setDatePickerVisibile(false);
    setDateSelectMode("earliest");
  };

  const handleSelectedDate = (date: Date) => {
    setTravelDates((dates) =>
      dateSelectMode == "earliest"
        ? { ...dates, earliest: date }
        : { ...dates, latest: date }
    );
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
  const handleSelectedDays = (days: [number, number]) => {
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

  // const [showAutocomplete, setShowAutocomplete] = useState(false);

  // NOTE: How to refactor?
  useEffect(() => {
    console.log("HEADER UPDATE");
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Save"
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
      ),
    });
  }, [
    navigation,
    destination,
    travelDates,
    nightsAtDestination,
    maxStopovers,
    onConfirm,
  ]);

  return (
    <View flex={1}>
      <DestinationInput
        currentSelection={destination}
        onSelect={onDestinationSelect}
      />

      {/* <Button title="Open" onPress={() => setShowAutocomplete(true)} />
      <Autocomplete open={showAutocomplete} setOpen={setShowAutocomplete} /> */}

      <View $base-pl="$4" $base-pr="$5" flex={1}>
        <View flex={7}>
          <Button title="Earliest departure" onPress={selectDepartureDate} />
          <Text>{`Selected: ${formattedDate(travelDates.earliest)}`}</Text>

          <Button title="Latest departure" onPress={selectReturnDate} />
          <Text>{`Selected: ${formattedDate(travelDates.latest)}`}</Text>

          <Button
            title="Days at destination"
            onPress={() => setDaysSelectorVisible(true)}
          />
          <Text>{`Days at destination: ${nightsAtDestination[0]} - ${nightsAtDestination[1]}`}</Text>

          <Button
            title="Max stops"
            onPress={() => setStopsSelectorVisible(true)}
          />
          <Text>{`Max stops: ${maxStopovers}`}</Text>

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
      </View>
    </View>
  );
};
