import { createContext } from "react";

export type LocationsData = {
  airports: Record<string, any>;
  cities: Record<string, any>;
};
export const LocationsContext = createContext<LocationsData>({airports: {}, cities: {}});
