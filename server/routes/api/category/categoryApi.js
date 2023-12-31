const express = require("express");
const _ = express.Router();

const {
  newCategory,
  delCategory,
  getCategory,
  oneCategory,
} = require("../../../controller/category/categoryController");

_.post("/new", newCategory);
_.get("/delete/:uid", delCategory);
_.get("/all", getCategory);
_.get("/one/:uid", oneCategory);

module.exports = _;
