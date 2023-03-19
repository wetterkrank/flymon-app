export type LocationArea = {
  readonly id: string | null | undefined;
  readonly code: string | null | undefined;
  readonly locationId: string | null | undefined;
  readonly name: string | null | undefined;
  readonly slug: string | null | undefined;
  readonly flagURL: string | null | undefined;
};

export type Location = {
  readonly id: string | null | undefined;
  readonly locationId: string | null | undefined;
  readonly name: string | null | undefined;
  readonly timezone: string | null | undefined;
  readonly country: LocationArea | null | undefined;
  readonly slug: string | null | undefined;
  readonly city: LocationArea | null | undefined;
  readonly coordinates?: Coordinates;
  readonly type: string | null | undefined;
};

export type Locations = ReadonlyArray<Location>;

type ApiLocationArea = {
  id: string | null | undefined;
  name: string | null | undefined;
  code: string | null | undefined;
  slug: string | null | undefined;
};

type Coordinates = {
  readonly lat: number;
  readonly lng: number;
};

export type ApiLocation = {
  readonly id: string | null | undefined;
  readonly locationId: string | null | undefined;
  readonly name: string | null | undefined;
  readonly slug: string | null | undefined;
  readonly timezone: string | null | undefined;
  readonly type: string | null | undefined;
  readonly city:
      | (ApiLocationArea & {
            readonly country: ApiLocationArea | null | undefined;
        })
      | null
      | undefined;
  readonly location?: {
      readonly lat: number;
      readonly lon: number;
  };
};

export type ApiResponse = {
  readonly locations: ReadonlyArray<ApiLocation>;
};
