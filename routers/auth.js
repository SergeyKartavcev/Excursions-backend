const { register, login, logout, refresh } = require("../controllers/auth");
const express = require("express");
const { tryCatchWrapper } = require("../helpers/helpers");
const router = express.Router();
const { auth } = require("../middlewares/validate");
const { validateBody } = require("../middlewares/validate");
const { userSchema} = require("../middlewares/validate");

router.post("/register", validateBody(userSchema), tryCatchWrapper(register));
router.post("/login", tryCatchWrapper(login));
router.get("/logout",tryCatchWrapper(auth), tryCatchWrapper(logout));
router.get("/refresh",tryCatchWrapper(auth), tryCatchWrapper(refresh));


module.exports = router;