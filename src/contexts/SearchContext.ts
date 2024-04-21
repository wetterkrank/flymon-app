import { createContext } from "react";
import { SearchParams } from "../api/subscriptions/types";
import { defaultSearch } from "../api/subscriptions/subscription";

type SearchContextType = {
  search: SearchParams;
  setSearch: React.Dispatch<SearchParams>;
};

export const setSearch = (search: SearchParams) => {
  console.log("Updating search context with: ", search);
  return {...search, 'destination': 'HELLO'}
};

export const SearchContext = createContext<SearchContextType>({
  search: defaultSearch(),
  setSearch: setSearch,
});

export { defaultSearch, SearchParams };
