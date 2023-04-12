const { sentVerifyURL } = require("../services/verifycation");
const { HttpError } = require("../helpers/helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { Conflict, Unauthorized } = require("http-errors");
const service = require("../services/users");
const { JWT_SECRET } = process.env;
const { v4: uuidv4 } = require("uuid");

async function register(req, res, next) {
  const { name, email, password, verificationToken} = req.body;

  try {
    const verificationToken = uuidv4();
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const adminUser = await User.findOne({ email: "kartavcev1987serg@gmail.com", role: "admin" });
    let result;
    if (adminUser && req.body.role === "admin") {
      return res.status(403).json({ message: "Only the owner of this account can assign the admin role" });
    } else if (adminUser) {
      result = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        role: "user",
      });
    } else {
      result = await User.create({
        name,
        email,
        password: hashedPassword,
        verificationToken,
        role: "admin",
      });
    }

    await result.save();
    const verifyURL = `http://localhost:5000/auth/verify/${verificationToken}`;
   
    await sentVerifyURL(email, verifyURL);
    res.status(201).json({
      user: {
        id: result._id,
        email: result.email,
        name: result.name,
        role: result.role
      },
    });
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw new HttpError(409, "User with this email already exists");
    }

    throw error;
  }
}




async function logIn(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await service.getUserByEmail(email);
    if (!user) {
      throw Unauthorized("Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);

    if (!passwordCompare) {
      throw Unauthorized(401, "Email or password is wrong");
    }

    const payload = { id: user._id };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    const result = await service.updateUser(user._id, { token });
    res.json({
      token: result.token,
      user: {
        _id: result._id,
        name: result.name,
        email: result.email,
        role: result.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

async function logOut(req, res, next) {
  const { _id } = req.body;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
}

async function getCurrent(req, res, next) {
  const {name, email, subscription, token, role } = req.user;
  res.status(200).json({name, email, subscription, token, role});
}


const verifyToken = async (req, res, next) => {
  const { verificationToken } = req.params;

  try {
    const user = await service.getUserByVerificationToken(verificationToken);
    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    await service.updateUser(user._id, { verify: true });
    res.status(200).json({
      message: "Verification successful",
    });
  } catch (error) {
    next(error);
  }
};


const verifyEmail = async (req, res, next) => {
  const { email } = req.body;
  const {
    protocol,
    headers: { host },
  } = req;

  try {
    const user = await service.getUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: "Not found" });
    }

    if (user.verify) {
      return res.status(400).json({ message: "Verification has already been passed" });
    }

    const verificationToken = uuidv4();

    await service.updateUser(user._id, {
      verificationToken,
    });

    const verifyURL = `http://localhost:5000/auth/verify/${verificationToken}`;

    await sentVerifyURL(email, verifyURL);

    res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  register,
  logIn,
  logOut,
  getCurrent,
  verifyEmail,
  verifyToken
};

