import { memo, useCallback, useState } from "react";
import { Dimensions } from "react-native";
import {
  Icon,
  ChevronDownIcon,
  CloseIcon,
  View,
  Text,
} from "@gluestack-ui/themed";
import {
  AutocompleteDropdown,
  TAutocompleteDropdownItem,
} from "react-native-autocomplete-dropdown";

import { fetchLocations } from "../api/locations/locations";
import { getLocationName } from "../services/locations";

export type DestinationInputItem = TAutocompleteDropdownItem & {
  code: string;
};

type DestinationInputProps = {
  currentSelection: string;
  onSelect: (destination: DestinationInputItem) => void;
};

// const DropdownItem = ({ item }: { item: DestinationInputItem }) => (
//   <View flex={1} flexDirection="row" h={50}>
//     <Text flex={0.7}>{item.title}</Text>
//     <Text flex={0.3}>{item.code}</Text>
//   </View>
// );

export const DestinationInput = memo(
  ({ currentSelection, onSelect }: DestinationInputProps) => {
    // NOTE: In order to show current selection as a nice string rather than IATA code,
    // we'll need to save extra data in the subscription or search
    // Or keep a dictionary of IATA codes and city/airport names
    // and possibly implement a local search with Fuse.js / Algolia / backend search with Typesense
    const initialValue = {
      id: currentSelection,
      code: currentSelection,
      title: `${getLocationName(currentSelection)} (${currentSelection})`,
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
      <>
        {/* <Pressable style={{
            'position': 'absolute',
            'left': 0,
            'top': 0,
            'right': 0,
            'bottom': 0,
        }}>
          <Text>Pressable!</Text>
          </Pressable> */}
        <AutocompleteDropdown
          dataSet={remoteDataSet}
          initialValue={initialValue}
          closeOnBlur={false} // NOTE: existing issue, https://github.com/onmotion/react-native-autocomplete-dropdown/issues/111
          useFilter={false} // set false to prevent rerendering twice
          clearOnFocus={true}
          onSelectItem={(item) => {
            item && onSelect(item as DestinationInputItem); // also called at init when no item is selected
          }}
          loading={loading}
          onChangeText={getSuggestions}
          debounce={500}
          textInputProps={{
            placeholder: "City or airport name",
            style: {
              color: "#fff", // TODO: use theme
            },
          }}
          // renderItem={(item) => DropdownItem({ item: item as DestinationInputItem })}
          suggestionsListMaxHeight={Dimensions.get("window").height * 0.5}
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
            marginTop: 0,
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
          ItemSeparatorComponent={<View height={0} />}
          showChevron={false}
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
      </>
    );
  }
);
