const express = require("express");
const router = express.Router();
const User = require("../models/customerSchema");
var moment = require("moment");
var usercontroller = require("../Controller/userController");

router.get("", usercontroller.hhh);
// POST Requst
router.post("", usercontroller.ggg);

module.exports = router;
