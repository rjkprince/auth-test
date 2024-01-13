const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { userRoles } = require("../enum/user");

const user_create = async function (req, res) {
  try {
    const { firstName, lastName, email, phone, password } = req.body;
    await User.create({
      firstName,
      lastName,
      email,
      phone,
      password,
    });
    res.send({ message: "Registration successful" });
  } catch (error) {
    res.send({
      status: 400,
      error: error.message,
    });
  }
};

(async () => {
  const userAdmin = await User.findOne({ email: "admin@example.com" });
  if (!userAdmin) {
    await User.create({
      firstName: "admin",
      lastName: "admin",
      email: "admin@example.com",
      phone: "123456789",
      password: "123456789",
      role: userRoles.admin,
    });
  }
})();

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1 hour",
    });
    res.send({ token });
  } catch (error) {
    res.send({ error: error.message });
  }
};

module.exports = {
  user_create,
  login,
};
