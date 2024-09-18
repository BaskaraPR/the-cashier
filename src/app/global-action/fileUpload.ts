import path from "path";
import { writeFile } from "fs/promises";

export const uploadImage = async (file: File): Promise<string | undefined> => {
  if (!file) {
    console.error("No file provided.");
    return undefined;
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const filename = Date.now() + file.name.replace(/\s+/g, "_");
  const filePath = path.join(process.cwd(), "public/menu/", filename);

  try {
    await writeFile(filePath, buffer);
    // Return the file path or URL if you need to use it
    // Here, we're assuming you want to use the file path for further processing
    return `/menu/${filename}`; // Return the relative URL or path
  } catch (error) {
    console.error("Error occurred while uploading file:", error);
    return undefined;
  }
};
