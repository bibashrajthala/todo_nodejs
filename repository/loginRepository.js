const Login = require("../models/login");

const loginRepository = () => {
  const getAll = async (args = {}) => {
    const result = await Login.find(args);
    // console.log("repository", result);
    return result;
  };

  const create = async (args = {}) => {
    const result = await Login.create(args);
    console.log("repository", result);
    return result;
  };

  return { getAll, create };
};

module.exports = loginRepository;
