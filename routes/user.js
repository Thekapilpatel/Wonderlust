const express = require("express");
const router = express.Router();
const User = require("../models/user"); // Import the User model
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../controllers/user.js");



router.route("/signup")
.get(userController.renderSignupForm) // signup
.post(userController.signup); //post signup



router.route("/login")
.get(userController.renderLoginForm) //login
.post(saveRedirectUrl, passport.authenticate
("local",{failureRedirect:"/login",failureFlash :true,}),userController.login); //post login

 

  router.get("/logout" ,userController.logout);

module.exports = router;