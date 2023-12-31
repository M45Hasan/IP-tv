const express = require("express");
const _ = express.Router();
const check = require("../../../middle/isExistance");
const {
  newCustomer,
  emailVerify,
  getMe,
  getAll,
} = require("../../../controller/customer/customerController");

_.post("/new", check, newCustomer);
_.get("/verify/:otp", check, emailVerify);
_.get("/all", getAll);
_.get("/me/:uid", getMe);

module.exports = _;
