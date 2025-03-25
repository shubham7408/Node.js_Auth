const dotenv = require("dotenv");
const express = require("express");
const app = express();
const connectDB = require("./database/db.js");
const authRoutes = require("./routes/auth_routes.js");
const homeRoutes = require("./routes/home_routes.js");
const adminRoutes = require("./routes/admin_routes.js");
const uploadImageRoutes = require("./routes/image-routes.js");

dotenv.config();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/",(req,res)=>{
    res.send("Hello World");
});

app.use("/api/auth",authRoutes);
app.use("/api/home",homeRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/upload",uploadImageRoutes);

app.listen(process.env.PORT,() => {
    console.log(`Server is running on port ${process.env.PORT}`);
})


