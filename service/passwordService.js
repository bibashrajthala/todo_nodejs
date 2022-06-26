const bcrypt = require("bcrypt");
const constants = require("../config/constants");

const passwordService = () => {
  const hashPassword = async (password) => {
    try {
      console.log(password);
      // const saltRound = 10;
      // const saltRound = parseInt(process.env.SALT_ROUNDS);
      const saltRound = constants.saltRound;

      const result = await bcrypt.hash(password, saltRound);
      return result;
    } catch (err) {
      console.log(err);
    }
  };

  const comparePassword = async (formPassword, hashedPassword) => {
    console.log(formPassword);
    console.log(hashedPassword);
    let result = await bcrypt.compare(formPassword, hashedPassword);
    console.log(result);
    return result;
  };
  return {
    hashPassword,
    comparePassword,
  };
};
module.exports = passwordService;
