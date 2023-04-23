type TravelDate =
  | {
      type: "relative";
      value: string;
    }
  | { type: "absolute"; value: Date };

// type Subscription = {
//   id: string;
//   from: string;
//   to: string;
//   earliestOutboundDate: TravelDate;
//   latestOutboundDate: TravelDate;
//   minDaysAtDestination: number;
//   maxDaysAtDestination: number;
//   maxStops: number;
// };
