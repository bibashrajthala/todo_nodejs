const constants = require("../config/constants");

const tokenService = require("../service/tokenService")();

const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Token required");
    }
    // console.log(req.body, "authentication");
    //   console.log(req.headers);
    //   console.log(req.headers.authorization);

    //   const bearerToken = req.headers.authorization.split(" ");
    //   const token = bearerToken[1];
    //   or
    const [bearer, token] = req.headers.authorization.split(" ");
    // console.log("token---authentication\t", token);

    //   const tokenSecret = "secret";
    const tokenSecret = constants.tokenSecret;
    const result = await tokenService.verifyToken({ token, tokenSecret });
    console.log(result, "authentication--result");
    if (!result) {
      throw new Error("JWT not verified");
    }
    next();
  } catch (err) {
    console.log(err.message, "--error--");
    // res.status(500).send(err);
    res.status(500).send(err.message);
  }
};
module.exports = authentication;
