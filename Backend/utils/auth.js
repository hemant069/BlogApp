const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

const setUserToken = (user) => {
  return jwt.sign({
    id: user._id,
    email: user.email,
  });
};

const getUserToken = (token) => {
  try {
    if (!token) return null;

    return jwt.verify(token, process.env.SECRET);
  } catch (error) {
    console.log("Not getting user token");
  }
};

module.exports = { setUserToken, getUserToken };
