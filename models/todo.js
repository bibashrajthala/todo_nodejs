let mongoose = require("mongoose");

const TodoSchema = mongoose.Schema({
  // Schema tells which data is of what type
  name: String,
  deadline: Date,
  points: Number,
  createdDate: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Todo", TodoSchema); // model name is Todo and Schema passed on it is TodoSchema
