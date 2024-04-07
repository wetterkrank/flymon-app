import { createContext, useContext } from "react";

export type LocationsData = {
  airports: Record<string, any>;
  cities: Record<string, any>;
};
export const LocationsContext = createContext<LocationsData>({airports: {}, cities: {}});

const getLocationName = (code: string) => {
  const { airports, cities } = useContext(LocationsContext);
  const airport_name = airports[code]?.name;
  const city_name = cities[code]?.name;

  return airport_name || city_name || code;
}

export { getLocationName };
