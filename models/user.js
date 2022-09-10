let mongoose = require("mongoose");

// const UserSchema = mongoose.Schema({
//   // Schema tells which data is of what type
//   firstName: String,
//   lastName: String,
//   age: Number,
//   createdDate: {
//     type: String,
//     default: Date.now(),
//   },
// });
const UserSchema = mongoose.Schema({
  firstName: String,
  middleName: String,
  lastName: String,
  course: String,
  gender: String,
  phone: Number,
  address: String,
  // email: String,
  email: {
    type: String,
    unique: true,
    index: true,
  },
  password: String,
  rePassword: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdDate: {
    type: Date,
    default: Date.now(),
  },
});

const User = mongoose.model("User", UserSchema);

User.createIndexes();
module.exports = User; // model name is Todo and Schema passed on it is TodoSchema
