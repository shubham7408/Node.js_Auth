const express = require("express");
const authmiddleware = require("../middlewares/auth-middlewares.js");
const adminMiddleware = require("../middlewares/admin-middleware.js");
const uploadMiddleware = require("../middlewares/upload-middleware.js");
const uploadImageController = require("../controllers/image_controller.js");
const router = express.Router();

//upload image

router.post("/uploads",authmiddleware,adminMiddleware,uploadMiddleware.single("image"),uploadImageController);

module.exports = router;