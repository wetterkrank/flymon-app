type TravelDate =
  | {
      type: "relative";
      value: string;
    }
  | { type: "absolute"; value: Date };
