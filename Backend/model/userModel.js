const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profileImg: { type: String, default: "./images/default.png" },
  role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
