const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const loginController = require("../controller/loginController")();

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/get", loginController.getAll);
router.post("/add", loginController.create);

module.exports = router;
