export const ORSM_URL = import.meta.env.VITE_ORMS_URL

export const Profile = {
  car: "car",
  bike: "bike",
  foot: "foot"
}

export const NEAREST_URL = (profile, coordinates) => `${ORSM_URL}/nearest/v1/${profile}/${coordinates}.json?number=${5}`
export const ROOT_URL = (profile, coordinates) => `${ORSM_URL}/route/v1/${profile}/${coordinates}?alternatives=${false}&steps=${true}&geometries=polyline&overview=full&annotations=${true}`