import React, { memo, useCallback, useState } from "react";
import { Text } from "react-native";
import { AutocompleteDropdown } from "react-native-autocomplete-dropdown";
import { fetchLocations } from "../api/locations/locations";

export const DestinationInput = memo(() => {
  const [loading, setLoading] = useState(false);
  const [remoteDataSet, setRemoteDataSet] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);

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
    <>
      <AutocompleteDropdown
        dataSet={remoteDataSet}
        closeOnBlur={false}
        useFilter={false}
        clearOnFocus={false}
        textInputProps={{
          placeholder: "City or airport name",
        }}
        onSelectItem={setSelectedItem}
        loading={loading}
        onChangeText={getSuggestions}
        suggestionsListTextStyle={{
          color: "#8f3c96",
        }}
        EmptyResultComponent={
          <Text style={{ padding: 10, fontSize: 15 }}>Oops ¯\_(ツ)_/¯</Text>
        }
      />
      <Text style={{ color: "#668", fontSize: 13 }}>
        Selected item: {JSON.stringify(selectedItem)}
      </Text>
    </>
  );
});
