import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config({ quiet: true });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (filePath) => {
  if (!filePath) return null;
  try {
    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "image",
    });
    fs.unlinkSync(filePath);
    return response;
  } catch (error) {
    console.log(error);
    fs.unlinkSync(filePath);
    return null;
  }
};
