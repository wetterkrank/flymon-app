export type LocationArea = {
  readonly id: string | null | undefined;
  readonly code: string | null | undefined;
  readonly locationId: string | null | undefined;
  readonly name: string | null | undefined;
  readonly slug: string | null | undefined;
  readonly flagURL: string | null | undefined;
};

export type Location = {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly timezone: string;
  readonly country: LocationArea | null | undefined;
  readonly slug: string;
  readonly city: LocationArea | null | undefined;
  readonly coordinates?: Coordinates;
  readonly type: string;
};

export type Locations = ReadonlyArray<Location>;

type ApiLocationArea = {
  id: string | null | undefined;
  name: string | null | undefined;
  code: string | null | undefined;
  slug: string | null | undefined;
};

type Coordinates = {
  readonly lat: number | undefined;
  readonly lng: number | undefined;
};

export type ApiLocation = {
  readonly id: string;
  readonly code: string;
  readonly name: string;
  readonly slug: string;
  readonly timezone: string;
  readonly type: string;
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
