import React, { memo, useCallback, useState } from "react";
import { Text } from "react-native";
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import { fetchLocations } from "../api/locations/locations";

export type DestinationInputItem = TAutocompleteDropdownItem & {
  code: string;
};

type DestinationInputProps = {
  currentSelection: string;
  onSelect: (destination: DestinationInputItem) => void;
};

export const DestinationInput = memo(
  ({ currentSelection, onSelect }: DestinationInputProps) => {
    // NOTE: In order to show current selection as a nice string rather than IATA code,
    // we'll need to save extra data in the subscription or search
    // Or keep a dictionary of IATA codes and city/airport names
    const initialValue = {
      id: currentSelection,
      code: currentSelection,
      title: currentSelection,
    };
    const [loading, setLoading] = useState(false);
    const [remoteDataSet, setRemoteDataSet] = useState<DestinationInputItem[]>([
      initialValue,
    ]);

    const getSuggestions = useCallback(async (query: string) => {
      if (query.length < 3) {
        setRemoteDataSet([]);
        return;
      }
      setLoading(true);

      const locations = await fetchLocations(query);
      const suggestions = locations.map((location) => ({
        id: location.id,
        code: location.code,
        title: location.name,
      }));
      // console.log("Suggestions: ", suggestions);

      setRemoteDataSet(suggestions);
      setLoading(false);
    }, []);

    // console.log("DestinationInput current: ", currentSelection);
    return (
      <AutocompleteDropdown
        dataSet={remoteDataSet}
        initialValue={initialValue}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={true}
        textInputProps={{
          placeholder: "City or airport name",
        }}
        onSelectItem={(item) => {
          onSelect(item as DestinationInputItem);
        }}
        loading={loading}
        onChangeText={getSuggestions}
        debounce={500}
        suggestionsListTextStyle={{
          color: "#8f3c96",
        }}
        EmptyResultComponent={
          <Text style={{ padding: 10, fontSize: 15 }}>
            No results ¯\_(ツ)_/¯
          </Text>
        }
      />
    );
  }
);
