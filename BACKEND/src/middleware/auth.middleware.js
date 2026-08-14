const jwt = require("jsonwebtoken");
const tokenBlacklistModel = require("../models/blacklist.models");

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "token not provided" });
  }

  const istokenblacklisted = await tokenBlacklistModel.findOne({ token });

  if (istokenblacklisted) {
    res.status(401).json({ message: "Token is Invalid" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log("JWT Error:", err.message);
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = { authUser };
