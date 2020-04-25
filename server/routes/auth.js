const express = require("express");
const AuthController = require("../controllers/auth");
const Router = express.Router();

Router.post("/login", AuthController.login);
Router.post("/register", AuthController.register);

module.exports = Router;
