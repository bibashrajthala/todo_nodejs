const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const UserController = require("../controller/userController")();

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/users", UserController.getAll);
router.post("/addUsers", UserController.create);

module.exports = router;
