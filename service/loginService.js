const passwordService = require("./passwordService")();

const loginRepository = require("../repository/loginRepository")();

const loginService = () => {
  const getAll = async (args = {}) => {
    const result = await loginRepository.getAll(args);
    // console.log("service", result);
    return result;
  };

  const create = async ({ email, password }) => {
    let hashPassword = await passwordService.hashPassword(password);
    const result = await loginRepository.create({
      email,
      password: hashPassword,
    });
    console.log("service", result);
    return result;
  };

  const updateById = async (args = {}) => {
    const result = await loginRepository.updateById(args);
    console.log("service", result);
    return result;
  };

  return { getAll, create, updateById };
};

module.exports = loginService;
