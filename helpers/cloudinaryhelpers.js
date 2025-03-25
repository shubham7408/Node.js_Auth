const cloudinary = require("../config/cloudinary.js");


async function uploadToCloudinary (filePath) {
    try {
        const result = await cloudinary.uploader.upload(filePath);
        return {
            url:result.secure_url,
            publicId:result.public_id,
        };
    } catch (error) {
        console.error(error);
        console.log({success:false,message:error.message});
    }
}

module.exports = {uploadToCloudinary};