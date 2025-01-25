const express = require("express");
const { handleSignUp } = require("../controller/user");

const router = express.Router();

router.post("/signup", handleSignUp);

module.exports = router;
