const TodoRepository = require("../repository/todoRepository")();

const TodoService = () => {
  const getAll = async (args = {}) => {
    const result = await TodoRepository.getAll(args);
    // console.log("service", result);
    return result;
  };

  // const create = async (args = {}) => {
  // const name = args.name;
  // const deadline = args.deadline;
  // const points = args.points;
  //or do destructuring
  const create = async ({ name, deadline, points, createdBy }) => {
    const result = await TodoRepository.create({
      name,
      deadline,
      points,
      createdBy,
    });
    console.log("service", result);
    return result;
  };

  const updateById = async (args = {}) => {
    const result = await TodoRepository.updateById(args);
    console.log("service", result);
    return result;
  };

  const updateByKey = async (args = {}) => {
    const result = await TodoRepository.updateByKey(args);
    console.log("service", result);
    return result;
  };

  const updateWithId = async ({ id, name, deadline, points }) => {
    const result = await TodoRepository.updateWithId({
      id,
      name,
      deadline,
      points,
    });
    console.log("service", result);

    return result;
  };

  const deleteById = async ({ id, name, deadline, points }) => {
    const result = await TodoRepository.deleteById({
      id,
      name,
      deadline,
      points,
    });
    console.log("service", result);

    return result;
  };

  return { getAll, create, updateById, updateByKey, updateWithId, deleteById };
};

module.exports = TodoService;
