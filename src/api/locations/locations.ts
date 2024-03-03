import { SERVER_URL } from "..";
import type { ApiResponse } from "./types";
import sanitizeLocation from "./helpers";

export type LocationInputTerm = {
  readonly term: string;
};

// NOTE: can use Travelpayouts autocomplete as an alternative
// https://autocomplete.travelpayouts.com/places2?locale=en&types[]=airport&types[]=city&term=lond
// TODO: Add return types, error handling
export const fetchLocations = async (term: string) => {
  // NOTE: the way we have to pass several location types is a bit strange
  const locationTypes = ["city", "airport"].reduce((acc, type) => {
    return `${acc}&location_types=${type}`;
  }, "");

  const query =
    new URLSearchParams({
      term: term ?? "",
      locale: "en-US", // TODO: set correct locale
      limit: "10",
      active_only: "true",
    }).toString() + locationTypes;
  const url = `${SERVER_URL}/locations/query?${query}`;

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": "temporary-key",
    },
  });
  const data: ApiResponse = await response.json();

  return data.locations.map((location) => sanitizeLocation(location));
};
