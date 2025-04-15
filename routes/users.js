const express = require("express");
const router = express.Router();
const User = require("../Models/user.js");
const passport = require("passport");
const { redirectUrlfunc } = require("../authmiddleware.js");
const usersControllers = require("../Controllers/users.js");
const wrapAsync = require("../utilis/wrapAsync.js");

router
  .route("/signup")
  .get(usersControllers.SingupGet)
  .post(wrapAsync(usersControllers.Singuppost));

// router.get("/signup",usersControllers.SingupGet );

// router.post("/signup", wrapAsync(usersControllers.Singuppost));

router
  .route("/login")
  .get(usersControllers.loginget)
  .post(
    redirectUrlfunc,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    usersControllers.logingPost
  );
// router.get("/login", usersControllers.loginget);

// router.post(
//   "/login",redirectUrlfunc,
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     failureFlash: true,
//   }),
//   usersControllers.logingPost
// );

router.get("/logout", usersControllers.logoutGet);

module.exports = router;
