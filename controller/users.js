const User = require("../models/user.js");

module.exports.renderSignupForm = (req, res) => {
  res.render("users/signup.ejs");
};

module.exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Create a new user and register them
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);

    // Log in the user after successful registration
    req.login(registeredUser, (err) => {
      if (err) {
        req.flash(
          "error",
          "Something went wrong while logging in. Please try again."
        );
        return next(err);
      }

      req.flash("success", "Welcome to Wanderlust!");
      return res.redirect("/listings");
    });
  } catch (e) {
    // Handle errors during registration
    req.flash("error", e.message);
    res.redirect("/signup");
  }
};

module.exports.renderSigninForm = (req, res) => {
  res.render("users/login.ejs");
};

module.exports.signIn = (req, res) => {
  req.flash("success", "Welcome back to Wanderlust!");
  let redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};
module.exports.logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "you are logged out!");
    res.redirect("/listings");
  });
};
