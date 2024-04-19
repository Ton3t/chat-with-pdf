import type { APIRoute } from "astro";

import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: "dc8ohjtfw",
  api_key: "625738214763651",
  api_secret: import.meta.env.CLOUDINARY_API_SECRET, // usando archivo .env
});

const uploadStream = async (
  buffer: Uint8Array,
  options: {
    folder: string;
  }
) : Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(options, (error, result) => {
        if (result) return resolve(result);
        reject(error);
      })
      .end(buffer);
  });
};

export const POST: APIRoute = async ({ request }) => {
  const formdata = await request.formData();
  const file = formdata.get("file") as File;
  if(file == null) {
    return new Response("No file found", { status: 400 });
  } 

  const arrayBuffer = await file.arrayBuffer();
  const unit8array = new Uint8Array(arrayBuffer);

  const result = await uploadStream(unit8array, {
    folder: "pdf",
  })

  const {
    asset_id: id,
    url,
    pages,
  } = result;

  // simulando dilay

  await new Promise((resolve) => setTimeout(resolve, 3000));
  return new Response(JSON.stringify(
    id,
    url,
    pages,
  ));
};
