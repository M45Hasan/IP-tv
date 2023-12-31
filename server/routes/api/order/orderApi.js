const express = require("express");
const _ = express.Router();

const {
  reqOrder,
  orderSuccess,
  orderCancel,
  allOrder,
  delOrder,
} = require("../../../controller/order/orderController");

_.post("/request", reqOrder);
_.post("/success/:tran_id", orderSuccess);
_.post("/cancel/:tran_id", orderCancel);
_.get("/all", allOrder);
_.delete("/delete/:uid", delOrder);

module.exports = _;
