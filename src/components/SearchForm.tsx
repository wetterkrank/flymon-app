import { useContext, useEffect, useState } from "react";
import { Button as RNButton } from "react-native";
import DatePickerModal from "react-native-modal-datetime-picker";

import { DestinationInputItem, DestinationInput } from "./DestinationInput";
import { DaysSelector } from "../components/DaysSelector";
import { StopsSelector } from "../components/StopsSelector";

import { formattedDate } from "../helpers";
import { SearchParams } from "../api/subscriptions/types";
import { Button, ButtonText, View, Text } from "@gluestack-ui/themed";
import { RootStackScreenProps } from "../navigation/types";
import { SearchContext } from "../contexts/SearchContext";

type TravelDates = {
  earliest: Date;
  latest: Date;
};

type SearchFormProps = {
  search: SearchParams;
  navigation: RootStackScreenProps<"EditSubscription">["navigation"];
  onConfirm: (search: SearchParams) => void;
};

// const Cover = (
//   <Pressable zIndex={999} position="absolute" left={0} right={0} top={0} bottom={0} onPress={()=>{}}>
//     <Text>HELLO</Text>
//   </Pressable>
// );

export const SearchForm = ({
  search,
  navigation,
  onConfirm,
}: SearchFormProps) => {
  // Destination
  const [destination1, setDestination] = useState(search.destination);
  const searchContext = useContext(SearchContext);
  const destination = searchContext.search.destination;
  console.log("Destination: ", destination);

  const onDestinationSelect = (selection: DestinationInputItem) => {
    // console.log("Selected destination: ", selection);
    setDestination(selection.code);
  };

  // Travel dates
  const [travelDates, setTravelDates] = useState<TravelDates>({
    earliest: search.earliestDepartureDate,
    latest: search.latestDepartureDate,
  });

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

  // Days at destination
  const [nightsAtDestination, setNightsAtDestination] = useState<
    [number, number]
  >([search.minNightsAtDestination, search.maxNightsAtDestination]);

  const [isDaysSelectorVisible, setDaysSelectorVisible] = useState(false);
  const hideDaysSelector = () => setDaysSelectorVisible(false);
  const handleSelectedDays = (days: [number, number]) => {
    setNightsAtDestination(days);
    hideDaysSelector();
  };

  // Max stops
  const [maxStopovers, setMaxStopovers] = useState<number>(search.maxStopovers);
  const [isStopsSelectorVisible, setStopsSelectorVisible] = useState(false);
  const hideStopsSelector = () => setStopsSelectorVisible(false);
  const handleSelectedStops = (maxStops: number) => {
    setMaxStopovers(maxStops);
    hideStopsSelector();
  };

  // NOTE: How to refactor?
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <RNButton
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
    <>
      <Button onPress={() => navigation.navigate('Destination')}>
        <ButtonText>Select D</ButtonText>
      </Button>

      <View flex={1} py="$2" $base-pl="$4" $base-pr="$4" gap="$4">
        <DestinationInput
          currentSelection={destination}
          onSelect={onDestinationSelect}
        />
        <Text>{`Selected: ${destination}`}</Text>

        <View $base-pl="$4" $base-pr="$5" flex={1}>
          <View flex={7}>
            <Button onPress={selectDepartureDate}>
              <ButtonText>Earliest departure</ButtonText>
            </Button>
            <Text>{`Selected: ${formattedDate(travelDates.earliest)}`}</Text>

            <Button onPress={selectReturnDate}>
              <ButtonText>Latest departure</ButtonText>
            </Button>
            <Text>{`Selected: ${formattedDate(travelDates.latest)}`}</Text>

            <Button onPress={() => setDaysSelectorVisible(true)}>
              <ButtonText>Days at destination</ButtonText>
            </Button>
            <Text>{`Days at destination: ${nightsAtDestination[0]} - ${nightsAtDestination[1]}`}</Text>

            <Button onPress={() => setStopsSelectorVisible(true)}>
              <ButtonText>Max stops</ButtonText>
            </Button>
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
    </>
  );
};
