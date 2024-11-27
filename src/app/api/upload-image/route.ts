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
    const prompt = formData.get("userPrompt") as string

  // Check if a file is received
  if (!file) {
    // If no file is received, return a JSON response with an error and a 400 status code
    return NextResponse.json({ error: "No files received." }, { status: 400 });
  }

  // Convert the file data to a Buffer
  const buffer = Buffer.from(await file.arrayBuffer());

  // Replace spaces in the file name with underscores
  const filename = Date.now()  + path.extname(file.name);

  try {

    await writeFile(path.join(process.cwd(), "public/" + filename), buffer);

    const result:any = await imageUploadFunc(filename);

    const updatedImage = cloudinary.image(result.public_id, {effect: "gen_background_replace:prompt_person:" + prompt})




    return NextResponse.json({
      Message: "Success",
      status: 201,
      secure_url: result.secure_url,
      public_id: result.public_id,
      updatedImage
    });
  } catch (error) {
    // If an error occurs during file writing, log the error and return a JSON response with a failure message and a 500 status code
  
    return NextResponse.json({ Message: "Failed", status: 500 });
  }
};
