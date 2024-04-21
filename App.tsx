import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { AutocompleteDropdownContextProvider } from "react-native-autocomplete-dropdown";

import { LocationsContext, LocationsData } from "./src/services/locations";
import airportsData from "./src/services/locations/airports.json";
import citiesData from "./src/services/locations/cities.json";
import Navigation from "./src/navigation";
import { SearchContext, SearchParams, defaultSearch } from "./src/contexts/SearchContext";

export default function App() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  // TODO: Move this to a separate hook?
  const [locationsData, setLocationsData] = useState<LocationsData>({
    airports: {},
    cities: {},
  });
  useEffect(() => {
    console.log("Preparing locations data");
    const airports = airportsData.reduce((acc, airport) => {
      acc[airport.code] = airport;
      return acc;
    }, {} as Record<string, any>);
    const cities = citiesData.reduce((acc, city) => {
      acc[city.code] = city;
      return acc;
    }, {} as Record<string, any>);
    setLocationsData({ airports, cities });
  }, []);

  const [search, setSearch] = useState<SearchParams>(defaultSearch());

  return (
    <GluestackUIProvider config={config}>
      <LocationsContext.Provider value={locationsData}>
        <SearchContext.Provider value={{search: search, setSearch: setSearch}}>
          <AutocompleteDropdownContextProvider>
            <Navigation />
          </AutocompleteDropdownContextProvider>
        </SearchContext.Provider>
      </LocationsContext.Provider>
    </GluestackUIProvider>
  );
}
