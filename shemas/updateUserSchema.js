const Joi = require("joi").extend(require("@joi/date"));

const updateUserSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(2)
    .max(16),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^\+380\d{9}$/, "numbers"),
  city: Joi.string().pattern(/[A-Z][a-z]*/),
});

module.exports = { updateUserSchema };
