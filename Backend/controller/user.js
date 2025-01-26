const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const { setUserToken, getUserToken } = require("../utils/auth");
const Otpgenerate = require("../utils/generateOtp");
const otpModel = require("../model/OtpModel");

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

const handleForgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await userModel.findOne({ email });

    if (findUser) {
      // if user is found
      const GeneratedOtp = Otpgenerate();
      const SavegenOtp = new otpModel({
        otp: GeneratedOtp,
        userId: findUser._id,
      });
      await SavegenOtp.save();

      return res
        .status(200)
        .json({ msg: "Otp generated successfully", SavedOtp: SavegenOtp });
    } else {
      return res.status(404).json({ msg: "user is not found" });
    }
  } catch (error) {
    return res.status(401).json({
      msg: "Something went wrong with handleForgetPassword",
      error: error.message,
    });
  }
};

const handleverifyOtp = async (req, res) => {
  try {
    const { otp, email } = req.body;

    const validUser = await userModel.findOne({ email });

    if (!validUser) {
      return res.status(404).json({ msg: "invaild user" });
    }

    const validOtp = await otpModel.findOne({ otp, userId: validUser._id });

    if (!validOtp) {
      return res.status(401).json({ msg: "Invaild Otp" });
    }
    // For Now I am  comment this code for the authentication check

    // const finduserToken = await userModel.findOne({ _id: validOtp.userId });
    // console.log(finduserToken);
    // const getToken = getUserToken(finduserToken);

    // console.log(getToken);

    return res
      .status(200)
      .json({ msg: "otp matched successfully", userId: validOtp.userId });
  } catch (error) {
    return res.status(401).json({
      msg: "Something went wrong with verifyotp",
      error: error.message,
    });
  }
};

const handleresetPassword = async (req, res) => {
  try {
    const { userId, password } = req.body;
    const saltRound = 10;
    const findUser = await userModel.findOne({ _id: userId });
    if (!findUser) {
      return res.status(404).json({ msg: "invaild user" });
    }
    const hashPass = await bcrypt.hash(password, saltRound);
    const updatePassword = await userModel.findByIdAndUpdate(
      { _id: userId },
      { $set: { password: hashPass } },
      { new: true }
    );
    updatePassword.save();

    return res
      .status(201)
      .json({ msg: "Password updated successfully", updatePassword });
  } catch (error) {
    return res.status(401).json({
      msg: "Something went wrong with resetPassword",
      error: error.message,
    });
  }
};

module.exports = {
  handleSignUp,
  handleLogin,
  handleForgetPassword,
  handleverifyOtp,
  handleresetPassword,
};
