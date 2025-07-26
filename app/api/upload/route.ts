import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("file") as File;

  if (!file) return NextResponse.json({ error: "Rasm topilmadi" }, { status: 400 });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ folder: "products" }, (err, result) => {
        if (err) reject(err);
        resolve(result);
      }).end(buffer);
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Yuklashda xatolik" }, { status: 500 });
  }
}
