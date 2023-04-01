const {register, logIn, logOut, refresh } = require("../controllers/auth");
const { auth } = require("../middlewares/auth");
const express = require("express");
const { tryCatchWrapper } = require("../helpers/helpers");
const router = express.Router();


router.post("/register", tryCatchWrapper(register));
router.post("/login", tryCatchWrapper(logIn));
router.post("/logout", tryCatchWrapper(auth), tryCatchWrapper(logOut));
router.get("/refresh", tryCatchWrapper(auth), tryCatchWrapper(refresh));

module.exports = router;
