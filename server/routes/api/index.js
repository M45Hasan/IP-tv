const express = require("express");
const _ = express.Router();
const regi = require("./registration/regiApi");
const customer = require("./customer/customerApi");
const category = require("./category/categoryApi");
_.use(regi);
_.use("/customer", customer);
_.use("/category", category);

module.exports = _;
