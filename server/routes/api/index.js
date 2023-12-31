const express = require("express");
const _ = express.Router();

const customer = require("./customer/customerApi");
const category = require("./category/categoryApi");
const service = require("./service/serviceApi");
const order = require("./order/orderApi");
_.use("/customer", customer);
_.use("/category", category);
_.use("/service", service);
_.use("/order", order);

module.exports = _;
