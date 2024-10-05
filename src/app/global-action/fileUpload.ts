import path from "path";
import { writeFile, unlink } from "fs/promises";

import { ACCEPTED_IMAGE_TYPES } from "@/lib/validator/menu";

export const handleImageUpload = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error("No file provided.");
  }
  

  if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
    throw new Error("Unsupported file type. Allowed types are: JPEG, PNG, JPG");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const fileExtension = file.type.split("/")[1];
  const filename = "menu-" + Date.now() + "." + fileExtension;


  await writeFile(path.join(process.cwd(), "public/menu/" + filename), buffer);
  return filename;
};


export const handleImageDelete = async (filename: string): Promise<void> => {
  const filePath = path.join(process.cwd(), "public/menu/", filename);
  
  try {
    await unlink(filePath);
  } catch (error) {
    console.error(`Failed to delete file: ${filename}`, error);
    throw new Error("Could not delete the image.");
  }
};
