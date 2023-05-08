import React, { memo, useCallback, useState } from "react";
import { Text } from "react-native";
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import { fetchLocations } from "../api/locations/locations";

type DestinationInputProps = {
  current: string;
  onSelect: (destination: TAutocompleteDropdownItem) => void;
};

export const DestinationInput = memo(
  ({ current, onSelect }: DestinationInputProps) => {
    const [loading, setLoading] = useState(false);
    const [remoteDataSet, setRemoteDataSet] = useState(undefined);

    const getSuggestions = useCallback(async (query: string) => {
      if (query.length < 3) {
        setRemoteDataSet(undefined);
        return;
      }
      setLoading(true);

      const locations = await fetchLocations(query);
      const suggestions = locations.map((location) => ({
        id: location.id,
        title: location.name,
      }));
      console.log("Suggestions: ", suggestions);

      setRemoteDataSet(suggestions);
      setLoading(false);
    }, []);

    console.log("DestinationInput current: ", current);
    return (
      <AutocompleteDropdown
        dataSet={remoteDataSet}
        initialValue={current}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={true}
        textInputProps={{
          placeholder: "City or airport name",
        }}
        onSelectItem={(item) => {item && onSelect(item)}}
        loading={loading}
        onChangeText={getSuggestions}
        debounce={500}
        suggestionsListTextStyle={{
          color: "#8f3c96",
        }}
        EmptyResultComponent={
          <Text style={{ padding: 10, fontSize: 15 }}>Oops ¯\_(ツ)_/¯</Text>
        }
      />
    );
  }
);
