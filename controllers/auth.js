const { User } = require("../models/user");
const { HttpError } = require("../helpers/helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

async function register(req, res, next) {
  const { email, password, name, city, phone } = req.body;
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const adminUser = await User.findOne({ email: "kartavcev1987serg@gmail.com", role: "admin" });
    if (adminUser && req.body.role === "admin") {
      return res.status(403).json({ message: "Only the owner of this account can assign the admin role" });
    } else if (adminUser) {
      newUser = await User.create({
        email,
        password: hashedPassword,
        name,
        city,
        phone,
        role: "user",
      });
    } else {
      newUser = await User.create({
        email,
        password: hashedPassword,
        name,
        city,
        phone,
        role: "admin",
      });
    }
    res.status(201).json({ user: newUser });
  
  } catch (error) {
    if (error.message.includes("E11000 duplicate key error")) {
      throw new HttpError(409, "User with this email already exists");
    }

    throw error;
  }
}

async function logIn(req, res, next) {
  const { email, password } = req.body;
  const loginUser = await User.findOne({
    email,
  });
  if (!loginUser) {
    throw new HttpError(401, "email is not valid");
  }
 
  const isPasswordValid = await bcrypt.compare(password, loginUser.password);
  if (!isPasswordValid) {
    throw new HttpError(401, "Email or password is wrong");
  }
  const token = jwt.sign({ id: loginUser._id }, JWT_SECRET, {
    expiresIn: "1h",
  });
  return res.json({
    data: {
      token,
    },
  });
}

async function logOut(req, res, next) {
  const { _id } = req.body;
  await User.findByIdAndUpdate(_id, { token: null });
  res.status(204).json();
}

async function refresh(req, res, next) {
  const {name, email, subscription } = req.user;
  const token = req.headers.authorization.split(' ')[1];
  res.status(200).json({name, email, subscription, token});
}




// async function verifyEmail(req, res, next) {
//   const { token } = req.params;
//   const user = await User.findOne({
//     verifyToken: token,
//   });

//   if (!user) {
//     throw BadRequest("Verify token is not valid!");
//   }

//   await User.findByIdAndUpdate(user._id, {
//     verify: true,
//     verifyToken: null,
//   });

//   return res.json({
//     message: "Success",
//   });
// }

// async function resendVerify(req, res, next) {
//   const { email } = req.body;
//   const user = await User.findOne({email});

//   if (!user) {
//     throw BadRequest("missing required field email");
//   }
//   if(user.verify){
//     throw BadRequest("Verification has already been passed");
//   }
//   await sendMail({
//     to: email,
//     subject: "please confirm your email",
//     html: `<a href="localhost:3001/api/users/verify/${user.verifyToken}">confirm your email</a>`,
//   });


//   return res.json({
//     message: "Success",
//   });
// }

module.exports = {
  register,
  logIn,
  logOut,
  refresh,
  // verifyEmail,
  // resendVerify
};

