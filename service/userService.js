const constants = require("../config/constants");

const passwordService = require("./passwordService")();

const userRepository = require("../repository/userRepository")();

const tokenService = require("./tokenService")();

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
  const create = async ({ firstName, lastName, email, password, role }) => {
    let hashPassword = await passwordService.hashPassword(password);
    const result = await userRepository.create({
      firstName,
      lastName,
      email,
      password: hashPassword,
      role,
    });
    // console.log("service", result);
    return result;
  };

  const login = async (args = {}) => {
    console.log(args, "service-login");
    let email = args.email;
    let password = args.password;

    let user = await userRepository.findOne({ email: email });
    if (!user) {
      throw new Error("User not found");
    }
    // console.log(user?.password, "userPassword");
    // console.log(password, "formPassword");
    let compare = await passwordService.comparePassword(
      password,
      user?.password
    );
    if (!compare) {
      throw new Error("Password doesnot match"); // this will be catched by controlwlers catch as this func is called in controller
    }

    const payload = {
      id: user?._id,
      email: user?.email,
      role: user?.role,
    };

    let accessTokenData = {
      payload: payload,
      // secret: "secret",
      secret: constants.tokenSecret,
      tokenLife: "15m",
    };

    const token = await tokenService.generateToken(accessTokenData);

    return {
      id: user?._id,
      email: user?.email,
      role: user?.role,
      token: token,
    };
  };

  const updateById = async (args = {}) => {
    const result = await userRepository.updateById(args);
    // console.log("service", result);
    return result;
  };

  const deleteById = async (args = {}) => {
    const result = await userRepository.deleteById(args);
    // console.log("service", result);
    return result;
  };

  return { getAll, create, updateById, login, deleteById };
};

module.exports = userService;
