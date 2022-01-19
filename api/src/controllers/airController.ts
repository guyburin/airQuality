import { Request, Response } from "express";

import airLocationModel, { airLocation } from "../models/airModel";
import { getAllAirQuality } from "../utils/helper";

export const getAllAirLocation = async (req: Request, res: Response) => {
  const result = await airLocationModel.find({});
  if (result) {
    return res.status(200).send(await getAllAirQuality(result));
  }
  return res.status(404).send({ message: "Not found all air location!" });
};

export const setAirLocation = async (req: Request, res: Response) => {
  const airLocation: airLocation = req.body;
  const newLocation = await new airLocationModel(airLocation);
  const result = await newLocation.save();
  if (result) {
    return res.status(200).send({
      message: `Add air location : ${airLocation.location_name} [Create Success!]`,
    });
  } else {
    return res.status(404).send({
      message: `Create air location ${airLocation.location_name} : False`,
    });
  }
};

export const updateAirLocationByID = async (req: Request, res: Response) => {
  const airLocationId: string = req.params.id;
  const updateAirLocation: airLocation = req.body;
  const result = await airLocationModel.updateOne(
    { _id: airLocationId },
    { $set: updateAirLocation }
  );
  if (result) {
    return res.status(200).send({
      message: `Updated : ${updateAirLocation.location_name}  [Update Success!]`,
    });
  }
  return res.status(404).send({
    message: `Cannot update : ${updateAirLocation.location_name} air location!`,
  });
};

export const deleteAirLocationByID = async (req: Request, res: Response) => {
  const airLocationId: string = req.params.id;
  const result = await airLocationModel.deleteOne({ _id: airLocationId });
  if (result) {
    return res
      .status(200)
      .send({ message: `Air location id:${airLocationId} [Delete Success!]` });
  }
  return res
    .status(404)
    .send({ message: `Air location id:${airLocationId} not found!` });
};
