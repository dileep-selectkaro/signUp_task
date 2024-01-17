const express = require("express");
const route = express.Router(); 
const controller = require("../controllers/user.controller");

route.post("/signup", controller.signup);

module.exports = route; 
