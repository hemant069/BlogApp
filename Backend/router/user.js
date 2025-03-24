const express = require("express");
const {
  handleSignUp,
  handleLogin,
  handleForgetPassword,
  handleverifyOtp,
  handleresetPassword,
  handleToggleFollow,
} = require("../controller/user");

// router

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/forget-password", handleForgetPassword);
router.post("/verify-otp", handleverifyOtp);
router.post("/reset-password", handleresetPassword);
router.post("/follow", handleToggleFollow);

module.exports = router;
