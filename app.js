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

let ejs = require("ejs");

///////
// importing index.js of routes folder
// let index = require("./routes/index");
let todoRoutes = require("./routes/todoRoutes");
// let userRoute = require("./routes/userRoute");
let userRoutes = require("./routes/userRoutes");
let loginRoute = require("./routes/loginRoute");
///

let app = express();

let port = 8080;

mongoose.connect("mongodb://localhost/Todo-Node");
let db = mongoose.connection;

db.once("open", () => {
  console.log("Mongodb is connected successfully");
});

//////
// using index imported above in app
// app.use("/", index);
app.use("/", todoRoutes);
// app.use("/user", userRoute);
app.use("/user", userRoutes);
app.use("/login", loginRoute);
/////////////

//for ejs
// console.log(__dirname);
// console.log(__filename);

app.set("views", __dirname + "/view"); // setting views to ejs files container/directory
app.engine("ejs", ejs.renderFile); // render ejs files
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public")); //tell where are all my static files like images css here in public folder

//
app.listen(port, () => {
  console.log(`Listening to port  ${port}`);
});

module.exports = app;
