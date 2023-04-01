type TravelDate =
  | {
      type: "relative";
      value: string;
    }
  | { type: "absolute"; value: Date };

type Subscription = {
  id: string;
  from: string;
  to: string;
  outboundDate: TravelDate;
  inboundDate: TravelDate | null;
  minDaysAtDestination: number;
  maxDaysAtDestination: number;
  maxStops: number;
};
