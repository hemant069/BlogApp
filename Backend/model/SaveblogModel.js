const { Schema, default: mongoose, Model } = require("mongoose");

const SaveBlogSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    saveblogs: { type: mongoose.Types.ObjectId, ref: "blog" },
  },
  {
    timestamps: true,
  }
);

const SaveModel = new Model("saveblog", SaveBlogSchema);

module.exports = SaveModel;
