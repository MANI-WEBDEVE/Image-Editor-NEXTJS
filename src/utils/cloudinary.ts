import cloudinaryConfig from "@/config/cloudinaryConfig";
import { v2 as cloudinary } from "cloudinary";

const imageUploadFunc = async (imagePath:string) => {

    cloudinaryConfig()
  const result = await cloudinary.uploader.upload(`public/${imagePath}`, {
    folder: "Next-file-Uploads",
    public_id: Date.now().toString(),
  });
  console.log( { result });

  return result;
};

export default imageUploadFunc;
