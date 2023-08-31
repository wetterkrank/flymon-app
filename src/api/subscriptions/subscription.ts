import useSWR from "swr";
import { z } from "zod";

import * as DateFNS from "date-fns";

import { fetcher, stasher } from "./requests";

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

// NOTE: for now, we have one type for serialized/deserialized object
const dateOrString = z.union([
  z.date(),
  z.string().transform((str) => new Date(str)),
]);
const searchSchema = z.object({
  id: z.number().optional(),
  origin: z.string(),
  destination: z.string(),
  earliestDepartureDate: dateOrString,
  latestDepartureDate: dateOrString,
  minNightsAtDestination: z.number(),
  maxNightsAtDestination: z.number(),
  maxStopovers: z.number(),
  lastResult: z.nullable(resultSchema).optional(),
});

const subscriptionSchema = z.object({
  id: z.number().optional(),
  search: searchSchema,
  pushToken: z.string().optional(),
});

const subscriptionListSchema = z.array(subscriptionSchema);

export type Result = z.infer<typeof resultSchema>;
export type Search = z.infer<typeof searchSchema>;
export type Subscription = z.infer<typeof subscriptionSchema>;
export type Subscriptions = z.infer<typeof subscriptionListSchema>;

export const useSubscriptions = () => {
  const { data, error, isLoading } = useSWR("subscriptions", fetcher);
  // console.log("useSubscriptions data:", data);
  // error && console.log("useSubscriptions error:", error?.message);

  // TODO: probably better to return undefined so we can check the data and show the fallback
  // const parsedData = data ? subscriptionListSchema.parse(data) : [];
  const parsedData = data ? subscriptionListSchema.parse(data) : undefined;

  return {
    data: parsedData,
    isLoading,
    error,
  };
};

export const saveSubscription = async (subscription: Subscription) => {
  // console.log("Create or update subscription: ", subscription);

  const id = subscription.id || "";
  const method = id ? "PUT" : "POST";
  const body = JSON.stringify({ subscription: subscription });

  const response = await stasher(`subscriptions/${id}`, method, body);
  if (!response.ok) {
    throw new Error("Failed to create subscription");
  }

  const data = await response.json();
  return subscriptionSchema.parse(data);
};

// TODO: can we generate this from the schema?
export const defaultSearch = () => {
  const earliestDepartureDate = DateFNS.addDays(new Date(), 1);
  const latestDepartureDate = DateFNS.addDays(earliestDepartureDate, 2);
  return {
    id: undefined,
    origin: "BER",
    destination: "LON",
    earliestDepartureDate,
    latestDepartureDate,
    minNightsAtDestination: 7,
    maxNightsAtDestination: 14,
    maxStopovers: 1,
    lastResult: null,
  };
};

export const defaultSubscription = () => ({
  id: undefined,
  search: defaultSearch(),
});
