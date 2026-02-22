var moment = require("moment");
const AuthUser = require("../models/authUser");
var jwt = require("jsonwebtoken");

// /home
const user_index_get = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  AuthUser.findOne({ _id: decoded.id })
    .then((result) => {
      res.render("index", { arr: result.customerinfo, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

// add new User
const user_post = async (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
  console.log(req.body);
  AuthUser.updateOne(
    { _id: decoded.id },
    {
      $push: {
        customerinfo: {
          fireName: req.body.fireName,
          lastName: req.body.lastName,
          email: req.body.email,
          phoneNumber: req.body.phoneNumber,
          age: req.body.age,
          country: req.body.country,
          gender: req.body.gender,
          createdAt: new Date(),
        },
      },
    },
  )
    .then((result) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

//delete exist object
const user_delete = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  AuthUser.updateOne(
    { "customerinfo._id": req.params.id },
    { $pull: { customerinfo: { _id: req.params.id } } },
  )
    .then((result) => {
      res.redirect("/home");
      console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//view:id
const user_view_get = (req, res) => {
  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);
  //decoded.id
  //req.params.id
  AuthUser.findOne({ "customerinfo._id": req.params.id })
    .then((result) => {
      const objj = result.customerinfo.find((item) => {
        return item._id == req.params.id;
      });
      res.render("user/view", { obj: objj, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

//edit:id
const user_edit_get = (req, res) => {
  AuthUser.findOne({ "customerinfo._id": req.params.id })
    .then((result) => {
      const obj_edit = result.customerinfo.find((item) => {
        return item._id == req.params.id;
      });

      res.render("user/edit", { obj: obj_edit, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};
//update:id
const user_put = (req, res) => {
  AuthUser.updateOne(
    { "customerinfo._id": req.params.id },
    {
      "customerinfo.$.fireName": req.body.fireName,
      "customerinfo.$.lastName": req.body.lastName,
      "customerinfo.$.email": req.body.email,
      "customerinfo.$.phoneNumber": req.body.phoneNumber,
      "customerinfo.$.age": req.body.age,
      "customerinfo.$.country": req.body.country,
      "customerinfo.$.gender": req.body.gender,
      "customerinfo.$.updatedAt": new Date(),
    },
  )
    .then((result) => {
      res.redirect("/home");
    })
    .catch((err) => {
      console.log(err);
    });
};

const user_add_get = (req, res) => {
  res.render("user/add");
};
//search:id
const user_search_post = async (req, res) => {
  const searchText = req.body.searchText.trim();

  var decoded = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET_KEY);

  AuthUser.findOne({ _id: decoded.id })
    .then((result) => {
      const searchCustomer = result.customerinfo.filter((item) => {
        return (
          item.fireName.includes(searchText) ||
          item.lastName.includes(searchText)
        );
      });
      res.render("user/search", { arr: searchCustomer, moment: moment });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  user_index_get,
  user_edit_get,
  user_view_get,
  user_search_post,
  user_delete,
  user_put,
  user_add_get,
  user_post,
};
