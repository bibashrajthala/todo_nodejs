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
    if (!formPassword || !hashPassword) {
      throw new Error(
        "No password arguments received by bcrypt's passordservice's comparePassword() data and hash arguments required"
      );
    }
    console.log(formPassword, "form password");
    console.log(hashedPassword, "hashed password");
    let result = await bcrypt.compare(formPassword, hashedPassword);
    // console.log(result);
    return result;
  };
  return {
    hashPassword,
    comparePassword,
  };
};
module.exports = passwordService;
