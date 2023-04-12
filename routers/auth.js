const {register, logIn, logOut, verifyToken, verifyEmail, getCurrent } = require("../controllers/auth");
const { auth } = require("../middlewares/auth");
const express = require("express");
const { validateSchema } = require("../middlewares/validation");
const { registerSchema, loginSchema } = require("../shemas/authShema");
const router = express.Router();


router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), logIn);
router.get("/logout", auth, logOut);
router.get("/current", auth , getCurrent);
router.get("/verify/:verificationToken", verifyToken);
router.post("/verify", verifyEmail);
module.exports = router;
