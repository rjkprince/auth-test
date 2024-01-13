const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { userRoles } = require("../enum/user");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("authorisation", req.authorization);
    console.log("user role", user.role);
    if (req.authorization && !req.authorization.includes(user.role)) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const adminOnly = (req, res, next) => {
  req.authorization = [userRoles.admin];
  next();
};

const allUsers = (req, res, next) => {
  req.authorization = Object.values(userRoles);
  next();
};

const usersOnly = (req, res, next) => {
  req.authorization = [userRoles.user];
  next();
};

module.exports = { authenticate, adminOnly, allUsers, usersOnly };
