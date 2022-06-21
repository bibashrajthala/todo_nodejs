const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const TodoController = require("../controller/todoController")();

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/todos", TodoController.getAll);
router.post("/addTodo", TodoController.create);
router.patch("/updateById", TodoController.updateById);
router.patch("/updateByKey", TodoController.updateByKey);

module.exports = router;
