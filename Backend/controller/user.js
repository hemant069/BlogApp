const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const { setUserToken } = require("../utils/auth");

const handleSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUserByEmail = await userModel.findOne({ email });
    const existingUserByUsername = await userModel.findOne({ username });
    if (!existingUserByEmail && !existingUserByUsername) {
      const saltround = 10;
      const hashPass = await bcrypt.hash(password, saltround);
      const newuser = new userModel({ username, password: hashPass, email });
      const savedUser = await newuser.save();
      return res
        .status(201)
        .json({ msg: "user is created successfully", user: savedUser });
    } else {
      return res.status(401).json({
        msg: "user is already existing or username is already existing",
      });
    }
  } catch (error) {
    return res.status(401).json({
      msg: "Something went wrong with handleSignUp function",
      error: error.message,
    });
  }
};

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exisitingUser = await userModel.findOne({ email });

    if (exisitingUser) {
      // TODO
      const checkpassword = await bcrypt.compare(
        password,
        exisitingUser.password
      );
      if (checkpassword) {
        // If password is true
        const token = setUserToken(exisitingUser);
        return res.status(202).json({ msg: "User login in success", token });
      } else {
        // password is wrong
        return res.status(401).json({ msg: "Please Enter Correct Password" });
      }
    } else {
      return res.status(404).json({ msg: "User is not exist" });
    }
  } catch (error) {
    return res.json({
      msg: "Something went wrong with handleLogin function",
      error: error.message,
    });
  }
};

module.exports = { handleSignUp, handleLogin };
