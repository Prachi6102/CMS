import dotenv from "dotenv";

dotenv.config();

const APP = {
  PORT: process.env.PORT || 3000,
};

const DB = {
  URI: process.env.MONGODB_URI || "",
};

const TOKEN = {
  ACCESS_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
  ACCESS_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "",
};

const CLOUDINARY = {
  CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  API_KEY: process.env.CLOUDINARY_API_KEY || "",
  API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
};

export { APP, DB, TOKEN, CLOUDINARY };
