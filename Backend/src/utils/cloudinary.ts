import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { CLOUDINARY } from "../config/app.config";

cloudinary.config({
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    // console.log("file uploaded successfully!!", response.url);
    return response;
  } catch (error: any) {
    fs.unlinkSync(localFilePath); //remove the locally saved temporary file
    return null;
  }
};
