const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const TodoController = require("../controller/todoController")();
const isAdmin = require("../middleware/isAdmin");

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// router.get("/todos", isAdmin, TodoController.getAll);
router.get("/todos", TodoController.getAll);
router.post("/addTodo", isAdmin, TodoController.create);
// router.post("/addTodo", TodoController.create);
router.patch("/updateById", TodoController.updateById);
router.patch("/updateByKey", TodoController.updateByKey);
router.delete("/delete", TodoController.deleteById);

router.get("/createForm", TodoController.createForm);
router.patch("/updateWithId/:id", TodoController.updateWithId);
router.get("/updateForm", TodoController.updateForm);

module.exports = router;
