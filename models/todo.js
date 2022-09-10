let mongoose = require("mongoose");
let User = require("./user");

const TodoSchema = mongoose.Schema({
  // Schema tells which data is of what type
  name: String,
  deadline: Date,
  points: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  createdDate: {
    type: String,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Todo", TodoSchema); // model name is Todo and Schema passed on it is TodoSchema
