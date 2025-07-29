const ReactionModel = require("../model/reactionsModel");
const dbConnect = require("../connect");
const handleReaction = async (req, res) => {
  try {
    await dbConnect();

    const { type, userId, blogId, commentId } = req.body;
    if (!commentId) {
      // Normal Post Like

      const reaction = new ReactionModel({ type, userId, blogId });

      await reaction.save();
      return res.json({ msg: "Reactions added successs", data: reaction });
    }

    // If user like's someone comment

    const commentReaction = new ReactionModel({
      blogId,
      userId,
      type,
      commentId,
    });

    await commentReaction.save();
    return res.json({
      msg: "comment reaction added successfully",
      data: commentReaction,
    });
  } catch (error) {
    return res.json({
      msg: "Something went wrong with reactions",
      error: error.message,
    });
  }
};

const handlegetReactions = async (req, res) => {
  try {
    await dbConnect();

    const { id } = req.params;
    const like = await ReactionModel.find({
      blogId: id,
      commentId: null,
    }).countDocuments({
      type: "like",
    });

    const dislike = await ReactionModel.find({
      blogId: id,
      commentId: null,
    }).countDocuments({
      type: "dislike",
    });
    const commentreactionLike = await ReactionModel.find({
      blogId: id,
      commentId: { $ne: null },
    }).countDocuments({ type: "like" });
    const commentreactionDisLike = await ReactionModel.find({
      blogId: id,
      commentId: { $ne: null },
    }).countDocuments({ type: "dislike" });
    return res.json({
      msg: "reactions get successfully",
      data: { like, dislike, commentreactionLike, commentreactionDisLike },
    });
  } catch (error) {
    return res.json({
      msg: "something went wrong with handlegetreactions",
      error: error.message,
    });
  }
};

const handleGetCommentReaction = async (req, res) => {
  try {
    await dbConnect();

    const { blogId, commentId } = req.body;
    const commentLike = await ReactionModel.find({
      blogId,
      commentId,
    }).countDocuments({ type: "like" });
    const commentDislike = await ReactionModel.find({
      blogId,
      commentId,
    }).countDocuments({ type: "dislike" });

    return res.json({
      msg: "comment reaction get success",
      data: { commentLike, commentDislike },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  handleReaction,
  handlegetReactions,
  handleGetCommentReaction,
};
