const CommentModel = require("../model/CommetModel");
const ReactionModel = require("../model/reactionsModel");
const dbConnect = require("../connect");
const handleComment = async (req, res) => {
  try {
    await dbConnect();
    const { content, userId, blogId, parentcommentId } = req.body;

    if (!parentcommentId) {
      const comment = new CommentModel({ content, user: userId, blog: blogId });
      await comment.save();
      return res.json({ msg: "comment successfully", data: comment });
    } else {
      const reply = new CommentModel({
        content,
        user: userId,
        blog: blogId,
        parentComment: parentcommentId,
      });
      await reply.save();

      await CommentModel.findByIdAndUpdate(
        parentcommentId,
        { $push: { replies: reply._id } },
        { new: true }
      );

      return res.json({ msg: "comment reply added success", data: reply });
    }
  } catch (error) {
    return res.json({
      msg: "Something went wrong with handleComment",
      error: error.message,
    });
  }
};

const handleGetComment = async (req, res) => {
  try {
    await dbConnect();

    const { id } = req.params;

    const comments = await CommentModel.find({ blog: id, parentComment: null })
      .populate("user")
      .populate({ path: "replies", populate: { path: "user" } });

    const commentIds = comments.map((comment) => comment._id);

    const reactions = await ReactionModel.aggregate([
      {
        $match: { commentId: { $in: commentIds } },
      },
      {
        $group: {
          _id: { commentId: "$commentId", type: "$type" },
          count: { $sum: 1 },
        },
      },
    ]);

    const reactionMap = {};

    reactions.forEach(({ _id, count }) => {
      const { commentId, type } = _id;
      if (!reactionMap[commentId]) reactionMap[commentId] = {};
      reactionMap[commentId][type] = count;
    });

    const enrichedComments = comments.map((comment) => ({
      ...comment.toObject(),
      reactions: reactionMap[comment._id] || { like: 0, dislike: 0 },
    }));

    return res.json({
      msg: "Comment data fetched successfully",
      data: enrichedComments,
    });
  } catch (error) {
    return res.json({ msg: "Something went wrong", error: error.message });
  }
};

module.exports = { handleComment, handleGetComment };
