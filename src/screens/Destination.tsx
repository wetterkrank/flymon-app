import { useContext } from "react";
import { View, Text, Button } from "react-native";

import { RootStackScreenProps } from "../navigation/types";
import { SearchContext } from "../contexts/SearchContext";

export default function Destination({
  navigation,
}: RootStackScreenProps<"Destination">) {
  const { search, setSearch } = useContext(SearchContext);

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>This is a modal!</Text>
      <Button
        onPress={() => {
          console.log("Updating search context with: ", search);
          setSearch({ ...search, destination: "HELLO" });
          navigation.goBack();
        }}
        title="Dismiss"
      />
    </View>
  );
}
