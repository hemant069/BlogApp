const express = require("express");
const {
  handleSignUp,
  handleLogin,
  handleForgetPassword,
  handleverifyOtp,
  handleresetPassword,
} = require("../controller/user");

// router for the user

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/forget-password", handleForgetPassword);
router.post("/verify-otp", handleverifyOtp);
router.post("/reset-password", handleresetPassword);

module.exports = router;
