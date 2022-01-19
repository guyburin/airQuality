import request from "supertest";
import { app } from "../app";

describe("airLocation router get all", () => {
  test("get all air location quality success!",() => {
    setTimeout(async () => {
      const response = await request(app).get("/airLocations");
      expect(response.statusCode).toBe(200);
    }, 3000);
  });
});

describe("airLocation router set location", () => {
  test("set AirLocation success!", async () => {
    const response = await request(app).post("/airLocations").send({
      location_name: "Chiang Mai",
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
        location_name: "Chiang Mai!",
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
