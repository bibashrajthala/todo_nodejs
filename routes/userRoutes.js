const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const UserController = require("../controller/userController")();
let authenticate = require("../middleware/authentication");

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/users", authenticate, UserController.getAll);
router.post("/register", UserController.create);
router.post("/login", UserController.login);

module.exports = router;
