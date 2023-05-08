import useSWR from "swr";
import { z } from "zod";

import * as DateFNS from "date-fns";

import { fetcher } from "./requests";

const BASE_URL = "http://192.168.1.128:3000";
const USER_ID = "1";

const resultSchema = z.object({
  id: z.string().optional(),
  price: z.number(),
  currency: z.string(),
  origin: z.string(),
  destination: z.string(),
  departureDate: z.string(),
  returnDate: z.string(),
  deeplink: z.string(),
});

const searchSchema = z.object({
  id: z.string().optional(),
  origin: z.string(),
  destination: z.string(),
  earliestDepartureDate: z.string().transform((str) => new Date(str)),
  latestDepartureDate: z.string().transform((str) => new Date(str)),
  minNightsAtDestination: z.number(),
  maxNightsAtDestination: z.number(),
  maxStopovers: z.number(),
  lastResult: z.nullable(resultSchema).optional(),
});

const subscriptionSchema = z.object({
  id: z.string().optional(),
  search: searchSchema,
});

const subscriptionListSchema = z.array(subscriptionSchema);

export type Result = z.infer<typeof resultSchema>;
export type Search = z.infer<typeof searchSchema>;
export type Subscription = z.infer<typeof subscriptionSchema>;
export type Subscriptions = z.infer<typeof subscriptionListSchema>;

export const useSubscriptions = () => {
  const { data, error, isLoading } = useSWR("subscriptions", (path) =>
    fetcher(`${BASE_URL}/users/${USER_ID}/${path}`)
  );
  console.log(data);
  console.log(error?.message);

  // TODO: probably better to return undefined so we can check the data and show the fallback
  const parsedData = data ? subscriptionListSchema.parse(data) : [];

  return {
    data: parsedData,
    isLoading,
    error,
  };
};

export const useSubscription = (subscriptionId: string | null) => {
  if (!subscriptionId) {
    return {
      data: newSubscription(),
      isLoading: false,
      error: undefined,
    };
  }

  const { data, error, isLoading } = useSWR(
    `${BASE_URL}/users/${USER_ID}/subscriptions/${subscriptionId}`,
    fetcher
  );
  console.log(data);
  console.log(error?.message);

  const parsedData = data ? subscriptionSchema.parse(data) : undefined;
  return {
    data: parsedData,
    isLoading,
    error: error,
  };
};

export const createSubscription = async (
  _key: string,
  { arg }: { arg: Subscription }
) => {
  console.log("Create or update subscription: ", arg);

  const body = JSON.stringify({
    subscription: arg,
  });
  console.log(body);

  const method = arg.id ? "PUT" : "POST";
  const id = arg.id ? arg.id : "";

  const response = await fetch(`${BASE_URL}/users/${USER_ID}/subscriptions/${id}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  if (!response.ok) {
    throw new Error("Failed to create subscription");
  }

  const data = await response.json();
  return subscriptionSchema.parse(data);
};

// TODO: can we generate this from the schema?
export const newSearch = () => {
  const earliestDepartureDate = DateFNS.addDays(new Date(), 1);
  const latestDepartureDate = DateFNS.addDays(earliestDepartureDate, 2);
  return {
    id: undefined,
    origin: "BER",
    destination: "HKT",
    earliestDepartureDate,
    latestDepartureDate,
    minNightsAtDestination: 7,
    maxNightsAtDestination: 14,
    maxStopovers: 1,
    lastResult: null,
  };
};

export const newSubscription = () => ({
  id: undefined,
  search: newSearch(),
});
