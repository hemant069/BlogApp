const { Schema, default: mongoose, model } = require("mongoose");

const OtpSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "USER",
      required: true,
    },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

const otpModel = new model("otp", OtpSchema);

module.exports = otpModel;
