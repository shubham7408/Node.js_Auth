const adminMiddleware = (req,res,next) => {
    if(req.userInfo.role !== "admin"){
        res.status(401)
        .json({success:false,message:"Unauthorized access!!! Only admin"});
    }
    next();
}


module.exports = adminMiddleware;