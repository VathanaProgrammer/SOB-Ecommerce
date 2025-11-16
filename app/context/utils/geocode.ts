// utils/geocode.ts
import axios from "axios";

export const getShortAddress = async (lat: number, lng: number) => {
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
  if (!GOOGLE_API_KEY) return "";

  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          latlng: `${lat},${lng}`,
          key: GOOGLE_API_KEY,
        },
      }
    );

    const data = response.data;

    if (!data.results || data.results.length === 0) return "";

    const components = data.results[0].address_components;

    const village = components.find((c: any) =>
      c.types.includes("sublocality_level_1")
    )?.long_name;

    const city = components.find((c: any) =>
      c.types.includes("administrative_area_level_1")
    )?.long_name;

    const country = components.find((c: any) =>
      c.types.includes("country")
    )?.long_name;

    return [village, city].filter(Boolean).join(", ");
  } catch (err) {
    console.error("Failed to get short address:", err);
    return "";
  }
};
