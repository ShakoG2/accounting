const express = require("express");
const registrationService = require("../service/Registration")
const app = express();

app.post("/register", registrationService.register);

module.exports = app;