const userService = require("../service/userService")();

const userController = () => {
  const getAll = async (req, res, next) => {
    const result = await userService.getAll(req.body);
    // console.log("controller", result);

    return res.status(200).send({
      data: result,
    });
  };

  const create = async (req, res, next) => {
    try {
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;
      const email = req.body.email;
      const password = req.body.password;

      const result = await userService.create({
        firstName,
        lastName,
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
      const result = await userService.updateById(req.body);
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

module.exports = userController;
