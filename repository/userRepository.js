const User = require("../models/user");

const UserRepository = () => {
  const getAll = async (args = {}) => {
    const result = await User.find(args);
    // console.log("repository", result);
    return result;
  };

  const create = async (args = {}) => {
    const result = await User.create(args);
    // console.log("repository", result);
    return result;
  };

  const findOne = async (args = {}) => {
    const result = await User.findOne(args);
    // console.log(result);
    return result;
  };

  const deleteById = async (args = {}) => {
    const result = await User.findByIdAndDelete(args);
    return result;
  };

  return { getAll, create, findOne, deleteById };
};

module.exports = UserRepository;
