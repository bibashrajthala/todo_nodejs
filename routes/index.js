const express = require("express");
const bodyParser = require("body-parser");

const Todo = require("../models/todo"); /// saved exported module(Todo) in Todo from todo  by imported it

const router = express.Router();

// use bodyparser to parse request  , posted from postman =>body,urlencoded,form
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// make new request for each router in postman

// router.get("/fetch", (req, res) => {
//   res.send(
//     "This is from fetch--0 route to postman(sent as response from postman)"
//   );
//   console.log("this is from fetch--0 route");
// });

// // router.get("/fetch1", (req, res) => {
// //   res.send("This is from fetch--1 route to postman");
// //   console.log("this is from fetch--1 route");
// // });

// router.post("/add", (req, res) => {
//   //   res.send("This is from add route to postman");
//   //   console.log(req);
//   console.log(req.body);

//   const id = req.body.id;
//   console.log(id);
//   console.log("this is from add route");
//   //   res.send(id); // for one route only one request and response is possible ,no multiPle req and res can be send
//   // but can req and respond as many data as you want in single req and res , and get or post as you want
//   // can req and res any data type as array , object, number, string ,etc
//   // res.send({
//   //   id,
//   //   name: req.body.name,
//   //   address: req.body.address,
//   //   detail: req.body.detail,
//   // });

// });

// router.post("/add1", (req, res) => {
//   // console.log(req.body);
//   console.log("this is from add--1 route");

//   res.send({
//     name: req.body.name,
//     address: req.body.address,
//     age: req.body.age,
//   });
// });

// route/path to ejs file
router.get("/hello", (req, res) => {
  res.render("hello"); // name of ejs file
});
router.get("/form", (req, res) => {
  res.render("form");
});
router.get("/showData", (req, res) => {
  res.render("showData", {
    name: "test todo1",
    deadline: "2020-1-1",
  });
});

router.get("/todos", function (req, res) {
  // get all data
  Todo.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "docs of todo");
      // res.send(docs);
      res.render("showData", { datas: docs }); // send array of object ie docs to showData ejs
    }
  });
  // res.send("hello from todos route");
});

// to delete in ejs file only get or post works so we use get and then pass id in params
router.get("/deleteById/:id", (req, res) => {
  console.log("delete");
  // now we are passing id from url params not from form body
  // console.log(req.body);
  console.log(req.params);
  console.log(req.params.id);

  // so use req.params.id
  Todo.findByIdAndDelete({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "docs from delete");
      // res.send(docs);
      res.redirect("/todos"); // so that we dont have to refresh and it redirects back to same '/todos' path  after delete
    }
  });
});

// to edit in ejs file only get or post works so we use get and then pass id in params
router.get("/editTodo/:id", (req, res) => {
  console.log("editTodo");
  // now we are passing id from url params not from form
  console.log(req.params.id);

  // so use req.params.id
  Todo.findById({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "docs");
      // res.send(docs);
      res.render("editForm", { data: docs }); //so that it renders editForm ejs when edit button is clicked and is diredted to '/editTodo/id' and then send data to editForm ejs
    }
  });
});

//to update from ejs file
router.post("/editForm", (req, res) => {
  console.log("editForm");
  console.log(req.body);

  // use req.body.id as data is from body ie (editForm form ejs)
  Todo.findByIdAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        name: req.body.name,
        deadline: req.body.deadline,
        points: req.body.points,
      },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs, "docs");
        // res.send(docs);
        res.redirect("/todos");
      }
    }
  );
});

router.get("/findById", function (req, res) {
  // get data only of particular id at first
  Todo.findById({ _id: req.body.id }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "docs of todo");
      res.send(docs);
    }
  });
});

router.get("/getOne", function (req, res) {
  // get data only of particular property at first
  Todo.findOne({ name: req.body.name }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "docs of todo");
      res.send(docs);
    }
  });
});

router.get("/getAll", function (req, res) {
  // get data only of particular property at first
  Todo.find({ name: req.body.name }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "docs of todo");
      res.send(docs);
    }
  });
});

router.post("/add", (req, res) => {
  console.log(req.body);

  let todo = new Todo({
    name: req.body.name,
    deadline: req.body.deadline,
    points: req.body.points,
  });

  let promise1 = todo.save();
  promise1.then((todo) => {
    console.log("Todo saved");
    res.send(todo);
  });
});

router.patch("/edit", (req, res) => {
  console.log("edit");

  // update according to _id
  Todo.findByIdAndUpdate(
    { _id: req.body.id },
    { $set: { name: req.body.name, deadline: req.body.deadline } },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs, "docs of edit");
        res.send(docs);
      }
    }
  );

  // // update according to name or other property
  // Todo.findOneAndUpdate(
  //   { name: req.body.name },
  //   {$set:
  //     ....
  //   },
  // .....same.....

  // but only update according to one thing at one route
});

router.delete("/deleteById", (req, res) => {
  console.log("delete");

  Todo.findByIdAndDelete({ _id: req.body.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "docs from delete");
      res.send(docs);
    }
  });
});

// findOneAndDelete or deleteOne
router.delete("/deleteOne", (req, res) => {
  console.log("delete");

  Todo.findOneAndDelete({ name: req.body.name }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "docs from delete");
      res.send(docs);
    }
  });
});

// deleteMany to delete things of same value
// not possible using just find as find just finds things , not find and delete
router.delete("/deleteAllOfSame", (req, res) => {
  console.log("delete");

  Todo.deleteMany({ name: req.body.name }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "docs from delete");
      res.send(docs);
    }
  });
});

// delete all data at once
// however doing this is a bad practice
router.delete("/deleteAll", (req, res) => {
  console.log("delete");

  Todo.deleteMany(function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "docs from delete");
      res.send(docs);
    }
  });
});

module.exports = router;
