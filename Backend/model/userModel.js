const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImg: { type: String, default: "./images/default.png" },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
    following: [{ type: mongoose.Types.ObjectId, ref: "user" }],
    followers: [{ type: mongoose.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
