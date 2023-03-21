const { User } = require("../models/user");
const { HttpError } = require("../helpers/helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

async function register(req, res) {
  const { name, email, password } = req.body;
  const candidate = await User.findOne({ email });
  if (candidate) {
    return res.status(400).json({ message: "Email already exists" });
  }
  const hashedPassword = bcrypt.hashSync(password, 10);
  
  // Check if user with email address is an admin
  const adminUser = await User.findOne({ email: "kartavcev1987serg@gmail.com", role: "admin" });
  
  let newUser;
  if (adminUser && req.body.role === "admin") {
    return res.status(403).json({ message: "Only the owner of this account can assign the admin role" });
  } else if (adminUser) {
    newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "user",
    });
  } else {
    newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "admin",
    });
  }
  
  res.status(201).json({ user: newUser });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const candidate = await User.findOne({email});
  if (!candidate) {
    throw new HttpError(401, "емеїл не вірний");
  }

  const comparePassword = bcrypt.compareSync(password, candidate.password);
  if (!comparePassword) {
    throw new HttpError(401, "пароль не вірний");
  }
  const token = jwt.sign({ id: candidate._id }, SECRET_KEY);
  return res.json({user: candidate, token});
}

async function logout(req, res, next) {
  await User.findByIdAndUpdate(req.user._id, {token: null});
  res.status(204).json();
}

async function refresh(req, res, next) {
res.send(req.user)
}

module.exports = {
  register,
  login,
  logout,
  refresh,
};
