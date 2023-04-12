const express = require("express");
const router = express.Router();

const { updateUser, getCurrentUserInfo } = require("../controllers/users");
const { validateSchema } = require("../middlewares/validation");
const { updateUserSchema } = require("../shemas/updateUserSchema");
const { auth } = require("../middlewares/auth");

router.patch(
  "/update",
  auth,
  validateSchema(updateUserSchema),
  updateUser
);
router.get("/current", auth, getCurrentUserInfo);

module.exports = router;
