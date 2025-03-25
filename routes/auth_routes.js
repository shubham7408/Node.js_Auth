const express = require("express");
const {register,login,changePassword} = require("../controllers/auth_controller.js");
const authmiddleware = require("../middlewares/admin-middleware.js");
const router = express.Router();


router.post("/register",register);
router.post("/login",login);
router.post("/changePassword",authmiddleware,changePassword)


module.exports = router;