import { z } from "zod";

const hasID = z.object({
  id: z.number(),
});

const resultSchema = z.object({
  id: z.number(),
  price: z.number(),
  currency: z.string(),
  origin: z.string(),
  destination: z.string(),
  departureDate: z.string(),
  returnDate: z.string(),
  deeplink: z.string(),
});

const dateOrString = z.union([
  z.date(),
  z.string().transform((str) => new Date(str)),
]);

export const searchParamsSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  earliestDepartureDate: dateOrString,
  latestDepartureDate: dateOrString,
  minNightsAtDestination: z.number(),
  maxNightsAtDestination: z.number(),
  maxStopovers: z.number(),
  lastResult: z.nullable(resultSchema).optional(),
});

const searchSchema = searchParamsSchema.merge(hasID);

const subscriptionParamsSchema = z.object({
  search: searchParamsSchema,
  pushToken: z.string().optional(),
});

export const subscriptionSchema = subscriptionParamsSchema
  .merge(hasID)
  .extend({ search: searchSchema });
export const subscriptionListSchema = z.array(subscriptionSchema);

export type Result = z.infer<typeof resultSchema>;

export type SearchParams = z.infer<typeof searchParamsSchema>;
export type Search = z.infer<typeof searchSchema>;

export type NewSubscription = z.infer<typeof subscriptionParamsSchema>;
export type Subscription = z.infer<typeof subscriptionSchema>;
export type Subscriptions = z.infer<typeof subscriptionListSchema>;
