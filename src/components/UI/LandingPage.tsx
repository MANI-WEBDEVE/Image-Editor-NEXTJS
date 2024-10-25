"use client";
import React, { useState } from "react";
import { Upload } from "lucide-react";

const LandingPage = () => {
  const [fileImage, setFileImage] = useState<File | null>(null); // Store the file as an object
  const [imageTag, setImageTag] = useState();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileImage(e.target.files[0]); // Set the selected file to state
    }
  };

  const handleUpload = async () => {
    if (!fileImage) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileImage);

    try {
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      const image = data.updatedImage;
      //   const img = data.data.updatedImage;
      const url = image.match(/src=['"](.*?)['"]/)[1];
      setImageTag(url);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <div className=" w-full mt-9 px-10 text-white flex items-start justify-center">
        <div className="w-full flex items-center justify-center flex-col gap-5 border-2 border-blue-500 rounded-lg p-5">
          <label
            htmlFor="file"
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 cursor-pointer"
          >
            {/* <LucideIcon name="image" className="w-5 h-5 mr-2" /> */}
            <Upload name="image" className="w-5 h-5 mr-2 text-black" />
            <span className="text-gray-700">Choose image</span>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <button
            onClick={handleUpload}
            className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Upload File
          </button>
        </div>
      </div>
      <div className="w-full h-dvh flex justify-start flex-wrap px-10 mt-10">
        <div className="w-[20%] h-[40%]  rounded-xl flex justify-center items-start border-[1px] border-blue-500">
            <div className="w-[95%] h-[60%]  mt-2 rounded-xl">
                <img className="rounded-xl object-cover w-full h-full" src={imageTag} alt="" />
            </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
