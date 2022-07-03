const jwt = require("jsonwebtoken");

const tokenService = () => {
  const generateToken = async (args = {}) => {
    // console.log(args);
    // console.log(args.payload);

    const token = await jwt.sign(args.payload, args.secret, {
      algorithm: "HS256",
      expiresIn: args.tokenLife,
    });
    console.log(token);
    return token;
  };

  const verifyToken = async (args = {}) => {
    console.log(args);

    const result = await jwt.verify(args.token, args.tokenSecret);
    console.log(result, "tokenService--verify--result");
    return result;
  };
  return {
    generateToken,
    verifyToken,
  };
};
module.exports = tokenService;
