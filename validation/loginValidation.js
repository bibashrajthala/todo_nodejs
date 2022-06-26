const Joi = require("joi");

const createLogin = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = createLogin;
