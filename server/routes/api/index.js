const express = require("express");
const _ = express.Router();
const regi = require("./registration/regiApi")

_.use(regi)


module.exports = _;
