const { Schema, default: mongoose, Model } = require("mongoose");

const SaveBlogSchema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "user", required: true },
    blogId: { type: mongoose.Types.ObjectId, ref: "blog", required: true },
  },
  {
    timestamps: true,
  }
);

const SaveModel = mongoose.model("saveblog", SaveBlogSchema);

module.exports = SaveModel;
