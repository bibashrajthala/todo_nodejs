const express = require("express");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const mediaController = require("../controller/mediaController")();

const app = express();

app.post("/upload", upload.single("avatar"), mediaController.upload);

// app.post(
//   "/photos/upload",
//   upload.array("photos", 12),
//   function (req, res, next) {
//     // req.files is array of `photos` files
//     // req.body will contain the text fields, if there were any
//   }
// );

module.exports = mediaRoutes;
