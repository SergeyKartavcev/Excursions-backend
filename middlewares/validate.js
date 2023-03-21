const { HttpError } = require("../helpers/helpers");
const jwt = require("jsonwebtoken");
const {User} = require("../models/user");
const {SECRET_KEY} = process.env;
const Joi = require("joi");

function validateBody(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }

    return next();
  };
}

async function auth(req, res, next) {

  const {authorization = " " } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (!token || bearer !=="Bearer") {
    throw HttpError(401, "не ауторізований");
  }
    try{const {id} = jwt.verify(token, SECRET_KEY);
    const candidate = await User.findById(id);
    if (!candidate) {
     return  HttpError(401, "не знайдено");
    }
    req.user = candidate;
    next();
  }  catch{
      return HttpError(401, "не ауторізований");
    }
}


const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string()
    .required()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } }),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
  })
  
  module.exports = {
    userSchema,
    auth,
    validateBody
  };
  

