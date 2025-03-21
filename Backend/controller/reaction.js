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

module.exports = { handleReaction };
