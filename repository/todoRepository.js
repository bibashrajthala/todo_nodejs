const Todo = require("../models/todo");

const TodoRepository = () => {
  const getAll = async (args = {}) => {
    // const result = await Todo.find(args).populate('createdBy')
    const result = await Todo.find(args).populate({
      path: "createdBy",
      select: ["firstName", "lastName", "email"],
    });
    // console.log("repository", result);
    return result;
  };

  const create = async (args = {}) => {
    const result = await Todo.create(args);
    console.log("repository", result);
    return result;
  };

  const updateById = async (args = {}) => {
    const result = await Todo.findByIdAndUpdate(
      { _id: args.id },
      {
        $set: { name: args.name, deadline: args.deadline, points: args.points },
      }
    );
    console.log("repository", result);
    return result;
  };

  const updateByKey = async (args = {}) => {
    const result = await Todo.findOneAndUpdate(
      { name: args.name },
      {
        $set: { name: args.name, deadline: args.deadline, points: args.points },
      }
    );
    console.log("repository", result);
    return result;
  };

  const updateWithId = async (args = {}) => {
    const result = await Todo.findByIdAndUpdate(
      { _id: args.id },
      {
        $set: { name: args.name, deadline: args.deadline, points: args.points },
      }
    );
    console.log("repository", result);
    return result;
  };
  const deleteById = async (args = {}) => {
    const result = await Todo.findByIdAndDelete({ _id: args.id }, args);
    console.log("repository", result);
    return result;
  };

  return { getAll, create, updateById, updateByKey, updateWithId, deleteById };
};

module.exports = TodoRepository;
