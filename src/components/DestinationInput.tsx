import React, { memo, useCallback, useState } from "react";
import { Dimensions, Text } from "react-native";
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";
import { fetchLocations } from "../api/locations/locations";
import { Icon, ChevronDownIcon, CloseIcon } from "@gluestack-ui/themed";

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
    // and possibly implement a local search with Fuse.js / Algolia / backend search with Typesense
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
      setRemoteDataSet(suggestions);
      setLoading(false);
    }, []);

    return (
      <AutocompleteDropdown
        dataSet={remoteDataSet}
        initialValue={initialValue}
        closeOnBlur={true}
        useFilter={false} // set false to prevent rerender twice
        clearOnFocus={true}
        textInputProps={{
          placeholder: "City or airport name",
          style: {
            color: "#fff", // TODO: use theme
          },
        }}
        onSelectItem={(item) => {
          item && onSelect(item as DestinationInputItem); // also called at init when no item is selected
        }}
        loading={loading}
        onChangeText={getSuggestions}
        debounce={500}
        suggestionsListMaxHeight={Dimensions.get("window").height * 0.3}
        inputContainerStyle={{
          borderRadius: 0,
          backgroundColor: "#383b42",
          height: 60,
          alignItems: "center",
        }}
        rightButtonsContainerStyle={{
          alignSelf: "center",
          right: 10,
          gap: 10,
        }}
        suggestionsListContainerStyle={{
          marginTop: 10,
          borderRadius: 0,
        }}
        suggestionsListTextStyle={{
          color: "#8f3c96",
        }}
        EmptyResultComponent={
          remoteDataSet.length >= 3 ? (
            <Text style={{ padding: 10, fontSize: 15 }}>
              No results ¯\_(ツ)_/¯
            </Text>
          ) : (
            <></>
          )
        }
        ChevronIconComponent={
          <Icon
            as={ChevronDownIcon}
            size="xl"
            color="$white"
            backgroundColor="$red"
          />
        }
        ClearIconComponent={<Icon as={CloseIcon} size="xl" color="$white" />}
      />
    );
  }
);
