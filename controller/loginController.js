const loginService = require("../service/loginService")();
const createLogin = require("../validation/loginValidation");

const loginController = () => {
  const getAll = async (req, res, next) => {
    const result = await loginService.getAll(req.body);
    // console.log("controller", result);

    return res.status(200).send({
      data: result,
    });
  };

  const create = async (req, res, next) => {
    try {
      const email = req.body.email;
      const password = req.body.password;

      const { error } = await createLogin.validate({
        email,
        password,
      });
      console.log(error);
      if (error) {
        throw error;
      }

      const result = await loginService.create({
        email,
        password,
      });
      console.log("controller", result);

      return res.status(200).send({
        data: result,
      });
    } catch (err) {
      res.status(500).send({ err: err });
    }
  };

  const updateById = async (req, res, next) => {
    try {
      const result = await loginService.updateById(req.body);
      console.log("controller", result);

      return res.status(200).send({
        data: result,
      });
    } catch (err) {
      res.status(500).send({ err: err });
    }
  };

  return {
    getAll,
    create,
    updateById,
  };
};

module.exports = loginController;
