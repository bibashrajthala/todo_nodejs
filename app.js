var http = require("http");

let express = require("express");
let mongoose = require("mongoose");

let ejs = require("ejs");

let cors = require("cors");

// let index = require("./routes/index");
let todoRoutes = require("./routes/todoRoutes");
// let userRoute = require("./routes/userRoute");
let userRoutes = require("./routes/userRoutes");
let mediaRoutes = require("./routes/mediaRoutes");
///

let app = express();

let port = 8080;

mongoose.connect("mongodb://localhost/Todo-Node");
let db = mongoose.connection;

db.once("open", () => {
  console.log("Mongodb is connected successfully");
});

// to allow it to connect to frontend host
app.use(express.json());

// app.use("/", index);
app.use("/", todoRoutes);
// app.use("/user", userRoute);
app.use("/user", userRoutes);
app.use("/media", mediaRoutes);

app.set("views", __dirname + "/view"); // setting views to ejs files container/directory
app.engine("ejs", ejs.renderFile); // render ejs files
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public")); //tell where are all my static files like images css here in public folder

app.get("/", cors(), (req, res) => {
  res.send("Sever is running");
});

// app.use(express.urlencoded({ extended: false }));
//
// app.use(express.json());

// app.use(cors());
// const options = {
//   autoIndex: true,
// };
// app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept "
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
// });

app.listen(port, () => {
  console.log(`Listening to port  http://localhost:${port}`);
});

module.exports = app;
