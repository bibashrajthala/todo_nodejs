const User = require("../models/user");

const UserRepository = () => {
  const getAll = async (args = {}) => {
    const result = await User.find(args);
    // console.log("repository", result);
    return result;
  };

  const create = async (args = {}) => {
    const result = await User.create(args);
    console.log("repository", result);
    return result;
  };

  return { getAll, create };
};

module.exports = UserRepository;
