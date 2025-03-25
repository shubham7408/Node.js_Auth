const UserModel = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


async function register(req, res) {
  try {
    //Extract the data 
    const { username, email, password, role } = req.body;
    // Check if the username and email ecisits
    const ifexists = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
    // if true terminate the process.
    if (ifexists) {
      return res.status(400).json({
        success: false,
        message: "User is already Exists",
      });
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10);
    // hashing the password and save in encrypted form
    const hashedpassword = await bcrypt.hash(password, salt);
    const newCreateUser = new UserModel({
      username,
      email,
      password: hashedpassword,
      role: role || "user",
    });
    await newCreateUser.save();
    if (newCreateUser) {
      res.status(201).json({
        success: true,
        message: "USer Registered Succesfully!",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to register Users please check!",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}


async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, messsage: "User Does not exists" });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Credentials" });
    }
    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "15m",
      }
    );
    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
}


async function changePassword(req,res) {
  try {
    const userId = req.userInfo.userId
    //extract old and new password
    const {oldPassword,newPassword} = req.body;
    //find the login user
    const user = await UserModel.findById(userId);
    if(!user){
      return res.status(400)
      .json({success:false,message:error.message});
    } 
    const isPasswordMatch = await bcrypt.compare(oldPassword,user.password);
    if(!isPasswordMatch){
      return res.status(400).json({success:false,message:error.message});
    }
    //hash new password
    const salt = await bcrypt.salt(10);
    const newHashedPassword = await bcrypt.hash(newPassword,salt);
    //update user password
    user.password = newHashedPassword;
    await user.save();

    return res.status(200).json({success:true,message:"Password Changed"});
  } catch (error) {
    console.error(error);
    res.status(503)
    .json({success:false,message:error.message});
  }
}

module.exports = { register, login, changePassword };
