import { airLocation } from "../models/airModel";
import axios from "axios";

type airQuality = {
  location_name: String;
  latitude: String;
  longitude: String;
  aqi: string;
  pm10: string;
  pm25: string;
};

export async function getAirQuality(Location: airLocation): Promise<object> {
  const airQuality = await axios.get(
    "https://air-quality.p.rapidapi.com/current/airquality",
    {
      params: { lat: Location.latitude, lon: Location.longitude },
      headers: {
        "x-rapidapi-host": "air-quality.p.rapidapi.com",
        "x-rapidapi-key": "76de90fc5amsh5bddc1910a2a766p112bd0jsnfdd6d7215654",
      },
    }
  );
  return airQuality.data;
}

export async function getAllAirQuality(Location: any): Promise<Array<object>> {
  let AirLocationQuality: airQuality;
  let allAirLocationQuality: Array<object> = [];
  for (const airLocation of Location) {
    const airQuality: any = await getAirQuality(airLocation);
    AirLocationQuality = {
      location_name: airLocation.location_name,
      latitude: airLocation.latitude,
      longitude: airLocation.longitude,
      aqi: airQuality.data[0].aqi,
      pm10: airQuality.data[0].pm10,
      pm25: airQuality.data[0].pm25,
    };
    allAirLocationQuality.push(AirLocationQuality);
  }
  return allAirLocationQuality;
}
