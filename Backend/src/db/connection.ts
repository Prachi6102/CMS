import mongoose from "mongoose";
import { DB } from "../config/app.config";

export const connectDB = async () => {
  try {
    await mongoose.connect(DB.URI);
    console.log("Connected to database!!");
  } catch (error: any) {
    throw new Error("Failed to connect to database!!");
  }
};
