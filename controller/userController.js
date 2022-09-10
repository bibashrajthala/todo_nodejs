const userService = require("../service/userService")();

const userController = () => {
  const getAll = async (req, res, next) => {
    // console.log(req.body, "controller");
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
      const role = req.body.role;
      // or use destructuring const {role,firstName}=req.body;

      const result = await userService.create({
        firstName,
        lastName,
        email,
        password,
        role,
      });
      // console.log("controller", result);

      return res.status(200).send({
        data: result,
      });
    } catch (err) {
      res.status(500).send({ err: err });
    }
  };

  const login = async (req, res, next) => {
    try {
      console.log(req, "controller-login");
      // if (!req.body.email || !req.body.password) {
      //   throw new Error("Data not recieived from frontend-Enter data");
      // }

      const result = await userService.login(req.body);
      // console.log(result);
      return res.status(200).send({
        data: result,
      });
    } catch (err) {
      console.log(err.message, "error");
      res.status(500).send(err.message);
    }
  };

  const updateById = async (req, res, next) => {
    try {
      const result = await userService.updateById(req.body);
      // console.log("controller", result);

      return res.status(200).send({
        data: result,
      });
    } catch (err) {
      res.status(500).send({ err: err });
    }
  };

  const deleteById = async (req, res, next) => {
    try {
      const result = await userService.deleteById(req.body);
      // console.log("controller", result);

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
    login,
    deleteById,
  };
};

module.exports = userController;
