const express=require("express");
const router=express.Router();
const passport = require("passport");
// 🔹 Start login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

// 🔹 Callback
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
  }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

// 🔹 Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

const AuthController=require("../controllers/auth.controller");
router.post("/signup",AuthController.createUser);
router.post("/login",AuthController.loginUser);
module.exports=router