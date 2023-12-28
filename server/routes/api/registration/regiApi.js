const express = require("express");
const _ = express.Router();

const registration = require("../../../controller/registration/registrationController");

_.post("/regi", registration);

module.exports = _;
