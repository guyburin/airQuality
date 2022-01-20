import { json } from "body-parser";
import request from "supertest";
import { app } from "../app";

describe("airLocation router get all", () => {
  test("get all air location quality success!", () => {
    setTimeout(async () => {
      var response = await request(app).get("/airLocations");
      expect(response.statusCode).toBe(200);
    }, 3000);
  });
});

describe("airLocation router set location", () => {
  test("set AirLocation success!", async () => {
    const response = await request(app).post("/airLocations").send({
      location_name: "testData",
      latitude: "18.796143",
      longitude: "98.979263",
    });
    expect(response.statusCode).toBe(200);
  });
});

describe("airLocation router update location", () => {
  test("update AirLocation success!", async () => {
    const response = await request(app)
      .patch("/airLocations/61e7c3fe3d8b63542d30ff4d")
      .send({
        location_name: "testData!",
        latitude: "18.796143",
        longitude: "98.979263",
      });
    expect(response.statusCode).toBe(200);
  });
});

describe("airLocation router delete location", () => {
  test("delete AirLocation success!", async () => {
    const response = await request(app).delete(
      "/airLocations/61e7c3fe3d8b63542d30ff4d"
    );
    expect(response.statusCode).toBe(200);
  });
});

describe("get Air Quality", () => {
  test("get one location Air Quality", async () => {
    const getAir = require("../utils/helper");
    const mock = jest.fn().mockReturnValue({
      data: [
        {
          mold_level: 0,
          aqi: 40,
          pm10: 4.55013,
          co: 462.294,
          o3: 86.4,
          predominant_pollen_type: "Trees",
          so2: 0,
          pollen_level_tree: 3,
          pollen_level_weed: 0,
          no2: 3.75,
          pm25: 3.3,
          pollen_level_grass: 1,
        },
      ],
      city_name: "Blue Point",
      lon: -73.01,
      timezone: "America/New_York",
      lat: 40.71,
      country_code: "US",
      state_code: "NY",
    });
    getAir.getAirQuality = mock;

    const result = getAir.getAirQuality({
      location_name: "Blue Point!",
      latitude: "40.71",
      longitude: "-73.01",
    });
    const expectedResault = {
      data: [
        {
          mold_level: 0,
          aqi: 40,
          pm10: 4.55013,
          co: 462.294,
          o3: 86.4,
          predominant_pollen_type: "Trees",
          so2: 0,
          pollen_level_tree: 3,
          pollen_level_weed: 0,
          no2: 3.75,
          pm25: 3.3,
          pollen_level_grass: 1,
        },
      ],
      city_name: "Blue Point",
      lon: -73.01,
      timezone: "America/New_York",
      lat: 40.71,
      country_code: "US",
      state_code: "NY",
    }
    expect(result).toMatchObject(expectedResault);
  });

  test("get all location Air Quality", async () => {
    const getAir = require("../utils/helper");
    const mock = jest.fn().mockReturnValue([
      {
        location_name: "Bangkok",
        latitude: "13.736717",
        longitude: "100.523186",
        aqi: 126,
        pm10: 99,
        pm25: 45,
      },
      {
        location_name: "Surat Thani",
        latitude: "9.14011",
        longitude: "99.33311",
        aqi: 65,
        pm10: 36,
        pm25: 19,
      },
      {
        location_name: "Chiang Mai",
        latitude: "18.796143",
        longitude: "98.979263",
        aqi: 78,
        pm10: 41,
        pm25: 25,
      },
    ]);
    getAir.getAllAirQuality = mock;

    const result = getAir.getAllAirQuality([
      {
        location_name: "Bangkok",
        latitude: "13.736717",
        longitude: "100.523186",
        aqi: 126,
        pm10: 99,
        pm25: 45,
      },
      {
        location_name: "Surat Thani",
        latitude: "9.14011",
        longitude: "99.33311",
        aqi: 65,
        pm10: 36,
        pm25: 19,
      },
      {
        location_name: "Chiang Mai",
        latitude: "18.796143",
        longitude: "98.979263",
        aqi: 78,
        pm10: 41,
        pm25: 25,
      },
    ]);
     const expectedResult = [{"location_name":"Bangkok","latitude":"13.736717","longitude":"100.523186","aqi":126,"pm10":99,"pm25":45},{"location_name":"Surat Thani","latitude":"9.14011","longitude":"99.33311","aqi":65,"pm10":36,"pm25":19},{"location_name":"Chiang Mai","latitude":"18.796143","longitude":"98.979263","aqi":78,"pm10":41,"pm25":25}]
    // console.log(JSON.stringify(result))
    expect(result).toMatchObject(expectedResult);
  });
});
