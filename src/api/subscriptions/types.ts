export type CreateSubscriptionApiRequest = {
  readonly origin: string;
  readonly destination: string;
  readonly earliestDepartureDate: string;
  readonly latestDepartureDate: string;
  readonly minNightsAtDestination: number;
  readonly maxNightsAtDestination: number;
  readonly maxStopovers: number;
};
