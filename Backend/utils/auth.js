const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const setUserToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    process.env.SCERET_KEY
  );
};

const getUserToken = (token) => {
  console.log("verify-token",token,process.env.SCERET_KEY)
  try {
    if (!token) return null;

    return jwt.verify(token, process.env.SCERET_KEY);
  } catch (error) {
    console.log("Not getting user token", error.message);
  }
};

module.exports = { setUserToken, getUserToken };
