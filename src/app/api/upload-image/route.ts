// Import necessary modules
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import imageUploadFunc from "@/utils/cloudinary";
import { v2 as cloudinary } from "cloudinary";
// Define the POST handler for the file upload
export const POST = async (req: NextRequest, res: NextResponse) => {
  // Parse the incoming form data
  const formData = await req.formData();

  // Get the file from the form data and assert its type as 'File'
  const file = formData.get("file") as File;

  // Check if a file is received
  if (!file) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Replace spaces in the file name with underscores
  const filename = Date.now() + Date.now() + path.extname(file.name);

  try {
    // Write the file to the specified directory (public/assets) with the modified filename
    await writeFile(path.join(process.cwd(), "public/" + filename), buffer);

    const result = await imageUploadFunc(filename);
    const updateImage = cloudinary.image(result.public_id, {
      effect: "gen_background_replace:person standing the moon",
    });
    console.log(`maniinam: ${updateImage}`);
    // Return a JSON response with a success message and a 201 status code
    return NextResponse.json({
      Message: "Success",
      status: 201,
      secure_url: result.secure_url,
      public_id: result.public_id,
    });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
    console.log("Error occurred ", error);
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
