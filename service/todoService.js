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
  const create = async ({ name, deadline, points }) => {
    const result = await TodoRepository.create({
      name,
      deadline,
      points,
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
  return { getAll, create, updateById, updateByKey };
};

module.exports = TodoService;
