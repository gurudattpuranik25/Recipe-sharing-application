import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

cloudinary.config({
  cloud_name: "drt2csneb",
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const uploadProfileImageToCloudinary = async (filepath) => {
  try {
    const response = await cloudinary.uploader.upload(filepath, {
      public_id: "avatar",
    });
    return response.url;
  } catch (error) {
    return false;
  }
};

const uploadRecipeImageToCloudinary = async (filepath) => {
  try {
    const response = await cloudinary.uploader.upload(filepath, {
      public_id: "image",
    });
    return response.url;
  } catch (error) {
    return false;
  }
};

export { uploadProfileImageToCloudinary, uploadRecipeImageToCloudinary };
