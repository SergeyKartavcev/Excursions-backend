const Joi = require("joi");

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(7).max(32).required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(4).max(32).required(),
  email: Joi.string().required(),
});

module.exports = { registerSchema, loginSchema };
