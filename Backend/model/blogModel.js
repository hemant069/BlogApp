const { Schema, model } = require("mongoose");

const BlogSchema = Schema(
  {
    title: { type: String, required: true },
    coverImgUrl: { type: String },
    content: { type: String, required: true },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamp: true }
);

const BlogModel = new model("blog", BlogSchema);

module.exports = BlogModel;
