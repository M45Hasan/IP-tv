const express = require("express");
const _ = express.Router();

const {
  newCategory,
  delCategory,
} = require("../../../controller/category/categoryController");

_.post("/new", newCategory);
_.get("/delete/:id", delCategory);

module.exports = _;
