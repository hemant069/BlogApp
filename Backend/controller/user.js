const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const { setUserToken, getUserToken } = require("../utils/auth");
const Otpgenerate = require("../utils/generateOtp");
const otpModel = require("../model/otpModel");

// Signup  function

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
      return res.status(201).json({ msg: "user is created successfully" });
    } else {
      return res.status(401).json({
        msg: "user is already existing or username is already existing",
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong with handleSignUp function",
      error: error.message,
    });
  }
};

// Login Function

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exisitingUser = await userModel.findOne({ email });
    console.log(exisitingUser);

    if (exisitingUser) {
      // TODO
      const checkpassword = await bcrypt.compare(
        password,
        exisitingUser.password
      );
      if (checkpassword) {
        // If password is true
        const token = setUserToken(exisitingUser);
        // res.cookie("token", token);
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

// Forget Password

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

// Verify Otp function is here

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

// Password reset function start from here

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

// Profile Image Upload

const handleProfileImageUpload = async (req, res) => {
  try {
    if (!req.file) {
      return res.json({ msg: "Image is not uploaded" });
    }
  } catch (error) {
    return res.json({ msg: "Something went wrong with handleProfile" });
  }
};

// Follow Handle start from here

const handleToggleFollow = async (req, res) => {
  try {
    const { userId, targetuserId } = req.body;

    const existinguserId = await userModel.findById(userId);
    const targeteduserId = await userModel.findById(targetuserId);

    if (existinguserId === targeteduserId) {
      return res.json({ msg: "You cannot follow yourself" });
    }

    if (!existinguserId || !targeteduserId) {
      return res.json({ msg: "user is not found" });
    }
    const userfollowing = existinguserId.following.includes(targetuserId);

    if (!userfollowing) {
      await userModel.findByIdAndUpdate(
        userId,
        {
          $push: { following: targetuserId },
        },
        { new: true }
      );

      await userModel.findByIdAndUpdate(
        targetuserId,
        { $push: { followers: userId } },
        { new: true }
      );

      return res.json({ msg: "user started following", data: true });
    }

    await userModel.findByIdAndUpdate(
      userId,
      { $pull: { following: targetuserId } },
      { new: true }
    );

    await userModel.findByIdAndUpdate(
      targetuserId,
      { $pull: { followers: userId } },
      { new: true }
    );

    return res.json({ msg: "user unfollowed ", data: false });
  } catch (error) {
    return res.json({
      msg: "something went wrong with togglefollow",
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
  handleToggleFollow,
};
