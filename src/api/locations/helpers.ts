import type { ApiLocation, Location } from "./types";

function sanitizeCity(location: ApiLocation) {
  if (location.city != null) {
    return {
      id: location.city.id,
      locationId: location.city.id,
      code: location.city.code,
      flagURL: null,
      slug: location.city.slug,
      name: location.city.name,
    };
  }

  return null;
}

// From https://github.com/kiwicom/margarita/blob/f572ddc9690ac9496ce18c608481112900a0fed3/apps/graphql/src/apps/location/helpers/sanitizeLocation.js#L18
export default function sanitizeLocation(location: ApiLocation): Location {
  return {
    id: location.id,
    code: location.code,
    name: location.name,
    slug: location.slug,
    type: location.type,
    timezone: location.timezone,
    coordinates: {
      lat: location.location?.lat,
      lng: location.location?.lon,
    },
    country: {
      id: location.city?.country?.id ?? "",
      locationId: location.city?.country?.id,
      code: location.city?.country?.code,
      flagURL: null,
      slug: location.city?.country?.slug,
      name: location.city?.country?.name,
    },
    city: sanitizeCity(location),
  };
}
