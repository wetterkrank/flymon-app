import { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import * as Notifications from "expo-notifications";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config"; // Optional if you want to use default theme

import HomeStackNavigator from "./src/navigation/HomeStack";

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

  //
  const [locationsData, setLocationsData] = useState<LocationsData>({
    airports: {},
    cities: {},
  });
  useEffect(() => {
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
        <NavigationContainer>
          <HomeStackNavigator />
        </NavigationContainer>
      </LocationsContext.Provider>
    </GluestackUIProvider>
  );
}
