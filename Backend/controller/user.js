const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");

const handleSignUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const saltround = 10;
    bcrypt.hash(password, saltround, async (err, hashPass) => {
      if (err) {
        return res.json({
          msg: "Something went wrong with hashing password",
          err,
        });
      }

      const user = await userModel({ username, hashPass, email });

      user.save();
    });

    res.status(201).json({ msg: "user is created successfully", user });
  } catch (error) {
    res.status(401).json("Something went wrong");
  }
};

module.exports = { handleSignUp };
