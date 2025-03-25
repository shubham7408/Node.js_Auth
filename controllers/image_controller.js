const imageModel = require("../models/Image.js");
const { uploadToCloudinary } = require("../helpers/cloudinaryhelpers.js");

async function uploadImageController(req, res) {
    try {
        // Check if file exists
        if (!req.file) {
            return res.status(400).json({ success: false, message: "File is missing" });
        }

        // Upload to Cloudinary
        const uploadResult = await uploadToCloudinary(req.file.path);

        // Check if upload failed
        if (!uploadResult || !uploadResult.url) {
            return res.status(500).json({ success: false, message: "Failed to upload image to Cloudinary." });
        }

        const { url, publicId } = uploadResult;

        // Store image info in database
        const newlyUploadedImage = new imageModel({
            url,
            publicId,
            uploadedBy: req.UserInfo.userId
        });

        await newlyUploadedImage.save();

        res.status(201).json({
            success: true,
            message: "Image uploaded successfully",
            newlyUploadedImage
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: error.message });
    }
}

module.exports = uploadImageController;
