const userModel = require("../model/userModel");

const handleSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await userModel({ username, email, password });

    user.save();

    res.status(201).json({ msg: "user is created successfully", user });
  } catch (error) {
    res.status(401).json("Something went wrong");
  }
};

module.exports = { handleSignUp };
