const mongoose = require("mongoose");

async function connectDB () {
    try {
        await mongoose.connect(process.env.URI);
        console.log("Database connected");
        isConnected = true;
    } catch (error) {
        console.error(error);
        console.log({success:false,message:error.message});
    }
}

module.exports = connectDB;