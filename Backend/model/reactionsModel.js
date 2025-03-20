const { default: mongoose, model } = require("mongoose");

const ReactionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["like", "dislike"], required: true },
    userId: { type: mongoose.Types.ObjectId, ref: "user" },
    blogId: { type: mongoose.Types.ObjectId, ref: "blog" },
  },
  { timestamps: true }
);

const ReactionModel = new model("reaction", ReactionSchema);

module.exports = ReactionModel;
