const jwt = require("jsonwebtoken");

const tokenService = () => {
  const generateToken = async (args = {}) => {
    console.log(args);

    const token = await jwt.sign(args.payload, args.secret, {
      algorithm: "HS256",
      expiresIn: args.tokenLife,
    });
    console.log(token);
    return token;
  };
  return {
    generateToken,
  };
};
module.exports = tokenService;
