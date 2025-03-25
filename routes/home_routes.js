const express = require("express");
const authmiddleware = require("../middlewares/auth-middlewares.js");
const router = express.Router();



router.get("/Welcome", authmiddleware,(req,res) => {
    const {username,userId,role} = req.userInfo;
    res.json({
        message:"Welcome to Home page",
        user:{
            _id:userId,
            username,
            role
        }
    });
});


module.exports = router;