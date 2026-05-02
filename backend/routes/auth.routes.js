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
    failureRedirect: "http://localhost:3000/login?error=auth_failed",
    session: true
  }),
  async (req, res) => {
    try {
      console.log("USER:", req.user);
      if (!req.user) {
        console.error("User not found after authentication");
        return res.redirect("https://figmaclone-delta.vercel.app/dashboard");
      }

      const jwt = require("jsonwebtoken");
      console.log("JWT_SECRET:", process.env.JWT_SECRET);
      const token = jwt.sign(
        { id: req.user._id },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );
      console.log("token created:", token);

      const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar,
        firstName: req.user.name.split(' ')[0],
        lastName: req.user.name.split(' ')[1] || ''
      };

      console.log("✅ OAuth successful for user:", user.email);

      // Store in session for reference
      req.session.token = token;
      req.session.user = user;

      // Redirect to frontend with token and user data
      const redirectUrl = `http://localhost:3000/dashboard/oauth-callback?token=${encodeURIComponent(token)}&user=${encodeURIComponent(JSON.stringify(user))}`;
      res.redirect(redirectUrl);
    } catch (err) {
      console.error("Google callback error:", err);
      res.redirect("http://localhost:3000/login?error=auth_error");
    }
  }
);

// 🔹 Session info endpoint
router.get("/me", (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }
  res.json({ user: req.user });
});

// 🔹 Logout
router.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("http://localhost:3000/login");
  });
});

const AuthController=require("../controllers/auth.controller");
router.post("/signup",AuthController.createUser);
router.post("/login",AuthController.loginUser);
module.exports=router