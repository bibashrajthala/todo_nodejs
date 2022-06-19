// const express = require("express");
// const router = express.Router();

// // const bodyParser = require("body-parser");

// const User = require("../models/user");

// router.get("/userRoute", (req, res) => {
//   res.send("This is from user route to postman(sent as response from postman)");
//   console.log("this is from user route to console");
// });

// router.get("/users", function (req, res) {
//   User.find((err, docs) => {
//     if (err) {
//       console.log(err, "err of user");
//     } else {
//       console.log(docs, "docs of user");
//     }
//   });
//   res.send("hello from user route");
// });

// module.exports = router;

const express = require("express");
const bodyParser = require("body-parser");
const User = require("../models/user");

const router = express.Router();

router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/getAlldata", function (req, res) {
  // get all data
  User.find((err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "got data");
      // res.send(docs);
      res.render("showDataUser", { datas1: docs });
    }
  });
});

// delete by id in ejs file (get method is used to delete in ejs file) (use id from params not from body)
router.get("/deleteOneById/:id", (req, res) => {
  console.log("delete");

  User.findByIdAndDelete({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "deleted datas");
      res.send(docs);
    }
  });
});

router.get("/getOneById", function (req, res) {
  // get data only of particular id at first
  User.findById({ _id: req.body.id }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "got data");
      res.send(docs);
    }
  });
});

router.get("/getOneByAKey", function (req, res) {
  // get data only of particular property at first
  User.findOne({ firstName: req.body.firstName }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "got data");
      res.send(docs);
    }
  });
});

router.get("/getMany", function (req, res) {
  // get data only of particular property at first
  User.find({ firstName: req.body.firstName }, (err, docs) => {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "got data");
      res.send(docs);
    }
  });
});

router.post("/post", (req, res) => {
  console.log("post");

  let datas = new User({
    firstName: req.body.firstName,
    middleName: req.body.middleName,
    lastName: req.body.lastName,
    gender: req.body.gender,
    course: req.body.course,
    phone: req.body.phone,
    email: req.body.email,
    address: req.body.address,
    password: req.body.password,
    rePassword: req.body.rePassword,
  });

  let promise1 = datas.save();
  promise1.then((datas) => {
    console.log("datas posted");
    res.send(datas);
  });
});

router.patch("/updateOneById", (req, res) => {
  console.log("update");

  // update according to _id
  User.findByIdAndUpdate(
    { _id: req.body.id },
    {
      $set: {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password,
        rePassword: req.body.rePassword,
      },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs, "data updated");
        res.send(docs);
      }
    }
  );
});

router.patch("/updateOneByAKey", (req, res) => {
  console.log("update");

  // update according to a key
  User.findOneAndUpdate(
    { firstName: req.body.firstName },
    {
      $set: {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password,
        rePassword: req.body.rePassword,
      },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs, "news updated");
        res.send(docs);
      }
    }
  );
});

router.patch("/updateMany", (req, res) => {
  console.log("update");

  // update according to a key
  User.updateMany(
    { firstName: req.body.firstName },
    {
      $set: {
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        phone: req.body.phone,
        address: req.body.address,
        password: req.body.password,
        rePassword: req.body.rePassword,
      },
    },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs, "news updated");
        res.send(docs);
      }
    }
  );
});

router.delete("/deleteOneById", (req, res) => {
  console.log("delete");

  User.findByIdAndDelete({ _id: req.body.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "deleted datas");
      res.send(docs);
    }
  });
});

// findOneAndDelete or deleteOne
router.delete("/deleteOneByAKey", (req, res) => {
  console.log("delete");

  User.findOneAndDelete(
    { firstName: req.body.firstName },
    function (err, docs) {
      if (err) {
        console.log(err);
      } else {
        console.log(docs, "deleted news");
        res.send(docs);
      }
    }
  );
});

router.delete("/deleteMany", (req, res) => {
  console.log("delete");

  User.deleteMany({ firstName: req.body.firstName }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "deleted news");
      res.send(docs);
    }
  });
});

router.delete("/deleteAll", (req, res) => {
  console.log("delete");

  User.deleteMany(function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log(docs, "deleted news");
      res.send(docs);
    }
  });
});

// route/path to ejs file
router.get("/register", (req, res) => {
  res.render("register"); // ejs file name
});

module.exports = router;
