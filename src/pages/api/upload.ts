import type { APIRoute } from "astro";

import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config({ 
  cloud_name: 'dc8ohjtfw', 
  api_key: '625738214763651', 
  api_secret: 'TbhxlKCieJig5SF-MdnoWxtTqb0' 
});

export const POST: APIRoute = async ({request}) => {
    const formdata = await request.formData();
    const file = formdata.get("file");
    console.log(file);

    // simulando dilay

    await new Promise((resolve) => setTimeout(resolve, 3000));
    return new Response("Hola mundo");
}