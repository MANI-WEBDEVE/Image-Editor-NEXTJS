"use client";
import React, { useState } from "react";

const LandingPage = () => {
  const [fileImage, setFileImage] = useState<File | null>(null); // Store the file as an object

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileImage(e.target.files[0]);  // Set the selected file to state
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
      console.log("File uploaded successfully:", data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div className="h-screen w-full mt-9 px-10 text-white">
      <div className="w-full flex items-center justify-center flex-col gap-5">
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload File</button>
      </div>
    </div>
  );
};

export default LandingPage;
