import type { ApiResponse } from "./types";
import sanitizeLocation from "./helpers";
import { KIWI_BASE_URL, KIWI_API_KEY } from "@env";

export type LocationInputTerm = {
  readonly term: string;
};

// TODO: Add return types, error handling
export const fetchLocations = async (term: string) => {
  const query = new URLSearchParams({
    term: term ?? "",
    locale: "en-US",
    location_types: "airport",
    limit: "10",
    active_only: "true",
  }).toString();
  const response = await tequilaFetch(`/locations/query?${query}`);
  const data: ApiResponse = await response.json();

  return data.locations.map((location) =>  sanitizeLocation(location));
};

// Only for testing
const tequilaFetch = (path: string) => {
  if (!KIWI_BASE_URL || !KIWI_API_KEY) {
    throw new Error("Missing Kiwi API-related environment variables.");
  }
  const url = `${KIWI_BASE_URL}${path}`;
  return fetch(url, {
    method: "GET",
    headers: { apikey: KIWI_API_KEY, "Content-Type": "application/json" },
  });
};
