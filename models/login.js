let mongoose = require("mongoose");

const LoginSchema = mongoose.Schema({
  email: String,
  password: String,

  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Login", LoginSchema); // model name is Todo and Schema passed on it is TodoSchema
