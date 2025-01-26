const express = require("express");
const router = express.Router();

const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controller/users.js");

router.route("/signup")
.get( userController.renderSignupForm)
.post( userController.signUp)


router.route("/login")
.get(userController.renderSigninForm)
.post(
  saveRedirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  userController.signIn
);

router.get("/logout", userController.logout);
module.exports = router;
