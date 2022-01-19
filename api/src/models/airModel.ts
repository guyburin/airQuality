import mongoose from "mongoose";

export interface airLocation {
  location_name: String;
  latitude: String;
  longitude: String;
}

const airLocationSchema = new mongoose.Schema({
  location_name: {
    type: String,
    required: true,
  },
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  },
});

export default mongoose.model("airLocation", airLocationSchema);
