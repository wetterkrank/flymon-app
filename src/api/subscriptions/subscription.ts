import useSWR from "swr";

import * as DateFNS from "date-fns";

import { Subscription, NewSubscription } from "./types";
import { subscriptionSchema, subscriptionListSchema } from "./types";
import { fetcher, poster } from "./requests";


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

export const createSubscription = async (subscription: NewSubscription) => {
  // console.log("Create subscription: ", subscription);

  const body = JSON.stringify({ subscription: subscription });
  const response = await poster("subscriptions/", "POST", body);
  if (!response.ok) {
    throw new Error("Could not create subscription");
  }

  const data = await response.json();
  return subscriptionSchema.parse(data);
};

export const updateSubscription = async (subscription: Subscription) => {
  const id = subscription.id;
  const body = JSON.stringify({ subscription: subscription });
  const response = await poster(`subscriptions/${id}`, "PUT", body);
  if (!response.ok) {
    throw new Error("Could not update subscription");
  }

  const data = await response.json();
  return subscriptionSchema.parse(data);
}

export const deleteSubscription = async (id: number) => {
  const response = await poster(`subscriptions/${id}`, "DELETE", "");
  if (!response.ok) {
    throw new Error("Could not delete subscription");
  }
};


export const defaultSearch = () => {
  const earliestDepartureDate = DateFNS.addDays(new Date(), 1);
  const latestDepartureDate = DateFNS.addDays(earliestDepartureDate, 2);
  return {
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
  search: defaultSearch(),
});
