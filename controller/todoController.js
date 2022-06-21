const TodoService = require("../service/todoService")();

const TodoController = () => {
  const getAll = async (req, res, next) => {
    const result = await TodoService.getAll(req.body);
    // console.log("controller", result);

    return res.status(200).send({
      data: result,
    });
  };

  const create = async (req, res, next) => {
    try {
      const name = req.body.name;
      const deadline = req.body.deadline;
      const points = req.body.points;
      const result = await TodoService.create({
        name,
        deadline,
        points,
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
      const result = await TodoService.updateById(req.body);
      console.log("controller", result);

      return res.status(200).send({
        data: result,
      });
    } catch (err) {
      res.status(500).send({ err: err });
    }
  };

  const updateByKey = async (req, res, next) => {
    try {
      const result = await TodoService.updateByKey(req.body);
      console.log("controller", result);

      return res.status(200).send({
        data: result,
      });
    } catch (err) {
      res.status(500).send({ err: err });
    }
  };

  return { getAll, create, updateById, updateByKey };
};

module.exports = TodoController;

// flow is from route to controller to service to repository
// but in controller, getAll of service is called and in service, getAll of repository is called so, first getAll of repository is run then getAll of service then getAll of controller is run.
