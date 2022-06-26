const passwordService = require("./passwordService")();

const userRepository = require("../repository/userRepository")();

const userService = () => {
  const getAll = async (args = {}) => {
    const result = await userRepository.getAll(args);
    // console.log("service", result);
    return result;
  };

  // const create = async (args = {}) => {
  // const fitstName = args.firstName;
  // const lastName = args.lastName;
  //or do destructuring
  const create = async ({ firstName, lastName, email, password }) => {
    let hashPassword = await passwordService.hashPassword(password);
    const result = await userRepository.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
    });
    console.log("service", result);
    return result;
  };

  const updateById = async (args = {}) => {
    const result = await userRepository.updateById(args);
    console.log("service", result);
    return result;
  };

  return { getAll, create, updateById };
};

module.exports = userService;
