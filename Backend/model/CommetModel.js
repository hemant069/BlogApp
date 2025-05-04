const { Schema, model } = require("mongoose");
const { default: mongoose } = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    content: { type: String, required: true },
    blog: { type: Schema.Types.ObjectId, ref: "blog", required: true },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      default: null,
    },
    replies: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  {
    timestamps: true,
  }
);

const CommentModel = new model("Comment", CommentSchema);

module.exports = CommentModel;
