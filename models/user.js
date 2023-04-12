const { Schema, model } = require("mongoose");

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },  
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    favorites: [{ type: Schema.Types.ObjectId, ref: "notice" }],
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    },
    verify: {
      type: Boolean,
      default: false,
    },
      role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { versionKey: false, timestamps: true }
);



const User = model("user", userSchema);

module.exports = { User };
