const express = require("express");
const _ = express.Router();
const upload = require("../../../utils/multa");
const {
  newService,
  allService,
  singleService,
  delService,
  updateService,
} = require("../../../controller/service/serviceController");

_.post("/new/:uid", upload.single("url"), newService);
_.get("/all", allService);
_.get("/one/:uid", singleService);
_.get("/delete/:uid", delService);
_.patch("/update/:uid", updateService);

module.exports = _;
