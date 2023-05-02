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
    const [remoteDataSet, setRemoteDataSet] = useState(null);

    const getSuggestions = useCallback(async (query: string) => {
      if (query.length < 3) {
        setRemoteDataSet(null);
        return;
      }
      setLoading(true);

      const locations = await fetchLocations(query);
      const suggestions = locations.map((location) => ({
        id: location.id,
        title: location.name,
      }));

      setRemoteDataSet(suggestions);
      setLoading(false);
    }, []);

    return (
      <AutocompleteDropdown
        dataSet={remoteDataSet}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={false}
        textInputProps={{
          placeholder: "City or airport name",
        }}
        onSelectItem={onSelect}
        loading={loading}
        onChangeText={getSuggestions}
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
