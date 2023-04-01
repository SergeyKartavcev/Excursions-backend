const Joi = require("joi");

const userSchema = Joi.object({
  email: Joi.string()
  .required()
  .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
  password: Joi.string()
  .pattern(new RegExp('/^.*(?=.{7,})((?!.* )(?=.*[!@#$%^&*()\-/_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/')),
})

module.exports = {
  userSchema
};