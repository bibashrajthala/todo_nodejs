const constants = require("../config/constants");

const tokenService = require("../service/tokenService")();

const isAdmin = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Token required");
    }

    const [bearer, token] = req.headers.authorization.split(" ");
    console.log("token---isAdmin\t", token);

    const tokenSecret = constants.tokenSecret;
    const result = await tokenService.verifyToken({ token, tokenSecret });
    console.log(result, "isAdmin--result");
    if (!result) {
      throw new Error("JWT not verified");
    }

    if (result.role !== "admin") {
      console.log("user is does not have permission.Only admins are allowed");
      throw new Error(
        "user is does not have permission.Only admins are allowed"
      );
    }
    next();
  } catch (err) {
    // console.log(err, "--error--");
    // res.status(500).send(err);
    res.status(500).send(err.message);
  }
};
module.exports = isAdmin;
