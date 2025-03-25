const express = require("express");
const authmiddleware = require("../middlewares/auth-middlewares.js");
const adminMiddleware = require("../middlewares/admin-middleware.js");
const router = express.Router();

router.get("/welcome",authmiddleware,adminMiddleware,(req,res) => {
    res.status(200).json({success:true,message:"Welcome to Admin page"});
})


module.exports = router;