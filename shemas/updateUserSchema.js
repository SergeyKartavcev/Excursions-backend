const Joi = require("joi").extend(require("@joi/date"));

const updateUserSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z]+$/)
    .min(2)
    .max(16),
  email: Joi.string().email(),

});

module.exports = { updateUserSchema };
