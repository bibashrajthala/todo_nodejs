var http = require("http"); // require() is just like import in react,its like importing http,,,,, always required as a string

// var server = http.createServer(function (req, res) {  // creates server
//   res.write("hello Http , hello again");
//   res.end();
// });

// server.listen(8080);

// modern and better way to do above thing:
// express is required then express is called and then listened to create and listen server
let express = require("express");
let mongoose = require("mongoose");

///////

let index = require("./routes/index");

let app = express();

let port = 8080;

mongoose.connect("mongodb://localhost/Todo-Node");
let db = mongoose.connection;

db.once("open", () => {
  console.log("Mongodb is connected successfully");
});

//////
app.use("/", index);
/////////////

app.listen(port, () => {
  console.log(`Listening to port  ${port}`);
});

module.exports = app;
