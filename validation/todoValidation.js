const Joi = require("joi");

const createTodo = Joi.object({
  name: Joi.string().required(),
  deadline: Joi.date().required(),
  //   points: Joi.string().length(3),
  points: Joi.string().min(2).max(3),
});

module.exports = createTodo;
