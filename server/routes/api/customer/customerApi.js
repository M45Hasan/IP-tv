const express = require("express");
const _ = express.Router();
const check = require("../../../middle/isExistance");
const {
  newCustomer,
  emailVerify,
} = require("../../../controller/customer/customerController");

_.post("/new", check, newCustomer);
_.get("/verify/:otp", check, emailVerify);

module.exports = _;
