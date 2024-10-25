"use client";
import React, { useState, useEffect } from "react";
import { Upload } from "lucide-react";
import { Button } from "antd";
import Link from "next/link";
import axios from "axios";

type UrlArray = string[];

const LandingPage = () => {
  const [fileImage, setFileImage] = useState<File | null>(null); // Store the file as an object
  const [imageTag, setImageTag] = useState("");
  const [userPrompt, setUserPrompt] = useState("");
  const [urls, setUrls] = useState<UrlArray>([]);

  // Load URLs from localStorage on component mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedUrls = JSON.parse(localStorage.getItem("imageUrls") || "[]");
      setUrls(savedUrls);
    }
  }, []);

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
    formData.append("userPrompt", userPrompt);

    try {
      const response = await axios.post(
        "/api/upload-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const data = response.data;
      const image = data.updatedImage;
      const url = image.match(/src=['"](.*?)['"]/)[1];
      setImageTag(url);

      // Update URLs and save to localStorage
      const updatedUrls = [...urls, url];
      setUrls(updatedUrls);
      localStorage.setItem("imageUrls", JSON.stringify(updatedUrls));
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <div className="w-full mt-9 px-10 text-white flex items-start justify-center">
        <div className="w-full flex items-center justify-center flex-col gap-5 border-2 border-blue-500 rounded-lg p-5">
          <label
            htmlFor="file"
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200 cursor-pointer"
          >
            <Upload name="image" className="w-5 h-5 mr-2 text-black" />
            <span className="text-gray-700">Choose image</span>
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
          <label htmlFor="prompt">
            <input
              type="text"
              id="prompt"
              placeholder="Enter prompt"
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              className="w-full bg-transparent   px-4 py-2 border border-gray-300 text-white rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
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
      <div className="w-full h-dvh flex justify-start flex-wrap px-10 mt-10 gap-6">
        {urls.map((image, index) => (
          <div
            key={index}
            className="w-[20%] h-[50%] rounded-xl flex justify-center items-start border-[1px] border-blue-500"
          >
            <div className="w-[85%] h-[96%] mt-2 rounded-xl flex justify-start items-center flex-col gap-6">
              <img
                className="rounded-xl object-cover w-full h-full"
                src={image}
                alt=""
              />
              <Button className="text-center mt-4 font-semibold uppercase bg-blue-600">
                <Link key={index} href={image} target="_blank">
                  Open the Image
                </Link>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LandingPage;
