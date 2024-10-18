import cloudinaryConfig from "@/config/cloudinaryConfig";
import { v2 as cloudinary } from "cloudinary";

const imageUploadFunc = async (imagePath:string) => {
 
    cloudinaryConfig()
  const result = await cloudinary.uploader.upload(`public/${imagePath}`, {
    folder: "Next-file-Uploads",
    public_id: "Next-file-Uploads-uploader",
  });
  console.log( { result });

  return result;
};

export default imageUploadFunc;
