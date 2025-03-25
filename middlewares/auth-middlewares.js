const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  console.log(authHeader);

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Token is missing or malformed" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log(decodedToken);
    req.userInfo = decodedToken;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;