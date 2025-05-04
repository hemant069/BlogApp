const ReactionModel = require("../model/reactionsModel");

const handleReaction = async (req, res) => {
  try {
    const { type, userId, blogId } = req.body;

    const reaction = new ReactionModel({ type, userId, blogId });

    await reaction.save();

    return res.json({ msg: "Reactions added successs", data: reaction });
  } catch (error) {
    return res.json({
      msg: "Something went wrong with reactions",
      error: error.message,
    });
  }
};

const handlegetReactions = async (req, res) => {
  const { id } = req.params;
  try {
    const like = await ReactionModel.find({ blogId: id }).countDocuments({
      type: "like",
    });

    const dislike = await ReactionModel.find({ blogId: id }).countDocuments({
      type: "dislike",
    });

    return res.json({
      msg: "reactions get successfully",
      data: { like, dislike },
    });
  } catch (error) {
    return res.josn({
      msg: "something went wrong with handlegetreactions",
      error: error.message,
    });
  }
};

const handleCommentReaction = async (req, res) => {
  const { blogId, userId, type, commentId } = req.body;

  try {
    const commentReaction = await ReactionModel({
      blogId,
      userId,
      type,
      commentId,
    }).populate("commentId");

    return res.json({
      msg: "comment reaction added successfully",
      data: commentReaction,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { handleReaction, handlegetReactions, handleCommentReaction };
