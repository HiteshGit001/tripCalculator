export const ORSM_URL = import.meta.env.VITE_ORMS_URL;
export const OPEN_WEATHER_URL = import.meta.env.VITE_OPEN_WEATHER;
export const OPEN_WEATHER_API_KEY = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
export const TOLL_TAX_URL = import.meta.env.VITE_TOLL_TAX_URL;
export const TOLL_TAX_API_KEY = import.meta.env.VITE_TOOL_KEY;

export const Profile = {
  car: "car",
  bike: "bike",
  foot: "foot"
}

export const NEAREST_URL = (profile, coordinates) => `${ORSM_URL}/nearest/v1/${profile}/${coordinates}.json?number=${5}`
export const ROOT_URL = (profile, coordinates) => `${ORSM_URL}/route/v1/${profile}/${coordinates}?alternatives=${false}&steps=${true}&geometries=polyline&overview=full&annotations=${true}`
export const OPEN_WEATHER_GEO_LOC_URL = (cityName) => `${OPEN_WEATHER_URL}/geo/1.0/direct?q=${cityName}&limit=${5}&appid=${OPEN_WEATHER_API_KEY}`
export const TOLL_TAX_WITH_PATH_URL = `${TOLL_TAX_URL}`