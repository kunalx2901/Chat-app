import {v2 as cloudinary} from 'cloudinary';
import {config} from 'dotenv';

config();

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

console.log(" cloud name "+process.env.CLOUDINARY_CLOUD_NAME);

export default cloudinary;