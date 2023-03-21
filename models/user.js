const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "введіть ім'я"],
  },
  email: {
    type: String,
    required: [true, "емєїл обовязковий"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "пароль обовязковий"],
  },
  token: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});


const User = mongoose.model("user", userSchema );

module.exports = {
    User
}