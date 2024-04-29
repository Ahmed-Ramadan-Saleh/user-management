const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment");
var usercontroller = require("../Controller/userController");

// GET Requst
router.get("/", usercontroller.user_index_get);

router.get("/edit/:id", usercontroller.user_edit_get);

router.get("/view/:id", usercontroller.ccc);

router.post("/search", usercontroller.ddd);

// DELETE Request
router.delete("/edit/:id", usercontroller.eee);

// PUT Requst
router.put("/edit/:id", usercontroller.fff);

module.exports = router;
