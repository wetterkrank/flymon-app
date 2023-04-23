import { createResource, Entity } from '@rest-hooks/rest';

export class Result extends Entity {
  id: string | undefined = undefined;
  price = 0;
  currency = '';
  origin = '';
  destination = '';
  departureDate = '';
  returnDate = '';
  deeplink = '';

  pk() { return this.id; }
}

export class Search extends Entity {
  id: string | undefined = undefined;
  origin = '';
  destination = '';
  earliestDepartureDate = '';
  latestDepartureDate = '';
  minNightsAtDestination = 1;
  maxNightsAtDestination = 1;
  maxStopovers = 0;
  lastResult: Result | null = Result.fromJS({});

  pk() { return this.id; }
}

export class Subscription extends Entity {
  id: string | undefined = undefined;
  search = Search.fromJS({});

  pk() { return this.id; }
}

export const SubscriptionResource = createResource({
  urlPrefix: 'http://127.0.0.1:3000',
  path: '/users/1/subscriptions/:id',
  schema: Subscription,
});

// import { CreateSubscriptionApiRequest } from "./types";
// import { formattedApiDate } from "../../helpers";

// const createSubscription = async (data: Subscription) => {

// const request: CreateSubscriptionApiRequest = {
//     origin: data.from,
//     destination: data.to,
//     earliestDepartureDate: formattedApiDate(data.earliestOutboundDate.value),
//     latestDepartureDate: formattedApiDate(data.latestOutboundDate.value),
//     minNightsAtDestination: data.minDaysAtDestination,
//     maxNightsAtDestination: data.maxDaysAtDestination,
//     maxStopovers: data.maxStops
//   }

//   const response = await fetch("https://localhost:3000", { method: "POST" });
//   return response;
// };
