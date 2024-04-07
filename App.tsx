import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme
import { AutocompleteDropdownContextProvider } from 'react-native-autocomplete-dropdown'

import RootNavigator from "./src/navigation/Root";

import { LocationsContext, LocationsData } from "./src/services/locations";
import airportsData from "./src/services/locations/airports.json";
import citiesData from "./src/services/locations/cities.json";

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

  return (
    <GluestackUIProvider config={config}>
      <LocationsContext.Provider value={locationsData}>
        <AutocompleteDropdownContextProvider>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </AutocompleteDropdownContextProvider>
      </LocationsContext.Provider>
    </GluestackUIProvider>
  );
}
