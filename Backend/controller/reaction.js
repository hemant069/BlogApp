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
  try {
    const like = await ReactionModel.countDocuments({ type: "like" });

    const dislike = await ReactionModel.countDocuments({ type: "dislike" });

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

module.exports = { handleReaction, handlegetReactions };
