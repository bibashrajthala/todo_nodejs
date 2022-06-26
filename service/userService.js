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

  const login = async (args = {}) => {
    let email = args.email;
    let password = args.password;

    let user = await userRepository.findOne({ email: email });
    console.log(user?.password, "userPassword");
    console.log(password, "formPassword");
    let compare = await passwordService.comparePassword(
      password,
      user?.password
    );
    if (!compare) {
      throw new Error("Password doesnot match"); // this will be catched by controlwlers catch as this func is called in controller
    }
    return {
      id: user?.id,
      email: user?.email,
    };
  };

  const updateById = async (args = {}) => {
    const result = await userRepository.updateById(args);
    console.log("service", result);
    return result;
  };

  return { getAll, create, updateById, login };
};

module.exports = userService;
