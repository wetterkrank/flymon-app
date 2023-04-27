import useSWR from "swr";
import { z } from "zod";

const BASE_URL = "http://192.168.1.128:3000";

const resultSchema = z.object({
  id: z.number().optional(),
  price: z.number(),
  currency: z.string(),
  origin: z.string(),
  destination: z.string(),
  departureDate: z.string(),
  returnDate: z.string(),
  deeplink: z.string(),
});

const searchSchema = z.object({
  id: z.number().optional(),
  origin: z.string(),
  destination: z.string(),
  earliestDepartureDate: z.string(),
  latestDepartureDate: z.string(),
  minNightsAtDestination: z.number(),
  maxNightsAtDestination: z.number(),
  maxStopovers: z.number(),
  lastResult: z.nullable(resultSchema),
});

const subscriptionSchema = z.object({
  id: z.number().optional(),
  search: searchSchema,
});

const subscriptionListSchema = z.array(subscriptionSchema);

export type Result = z.infer<typeof resultSchema>;
export type Search = z.infer<typeof searchSchema>;
export type Subscription = z.infer<typeof subscriptionSchema>;
export type Subscriptions = z.infer<typeof subscriptionListSchema>;

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export const useSubscriptions = (userId: string) => {
  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/users/${userId}/subscriptions`,
    fetcher
  );
  console.log(data);
  console.log(error?.message);

  // TODO: probably better to return undefined so we can check the data and show the fallback
  const parsedData = data ? subscriptionListSchema.parse(data) : [];

  return {
    data: parsedData,
    isLoading,
    error: error,
  };
};

export const useSubscription = (userId: string, subscriptionId: string | null) => {
  if (!subscriptionId) {
    return {
      data: newSubscription(userId),
      isLoading: false,
      error: undefined,
    };
  }

  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/users/${userId}/subscriptions/${subscriptionId}`,
    fetcher
  );
  console.log(data);
  console.log(error?.message);

  const parsedData = data ? subscriptionSchema.parse(data) : undefined;
  return {
    data: parsedData,
    isLoading,
    error: error
  }
};

// TODO: can we generate this from the schema?

export const newSearch = () => ({
  id: undefined,
  origin: "",
  destination: "",
  earliestDepartureDate: "",
  latestDepartureDate: "",
  minNightsAtDestination: 1,
  maxNightsAtDestination: 1,
  maxStopovers: 0,
  lastResult: null,
});

export const newSubscription = (userId: string) => ({
  id: undefined,
  userId: userId,
  search: newSearch(),
});
