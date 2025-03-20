const CommentModel = require("../model/CommetModel");

const handleComment = async (req, res) => {
  try {
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
    const comments = await CommentModel.find({})
      .populate({ path: "user" })
      .populate({ path: "replies" });

    console.log(comments);

    return res.json({ msg: "comment data successfully", data: comments });
  } catch (error) {
    return res.json({ msg: "something went wrong", error: error.message });
  }
};

module.exports = { handleComment, handleGetComment };
