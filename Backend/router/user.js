const express = require("express");
const {
  handleSignUp,
  handleLogin,
  handleForgetPassword,
  handleverifyOtp,
  handleresetPassword,
  handleToggleFollow,
  handleProfileUpdate,
} = require("../controller/user");
const multer = require("multer");

const upload = multer({ storage: multer.memoryStorage() });

// router

const router = express.Router();

router.post("/signup", handleSignUp);
router.post("/login", handleLogin);
router.post("/forget-password", handleForgetPassword);
router.post("/verify-otp", handleverifyOtp);
router.post("/reset-password", handleresetPassword);
router.post("/follow", handleToggleFollow);
router.put("/profile", upload.single("profileImg"), handleProfileUpdate);

module.exports = router;
