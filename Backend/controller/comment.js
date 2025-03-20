const CommentModel = require("../model/CommetModel");

const handleComment = async (req, res) => {
  try {
    const { content, userId, blogId } = req.body;

    const comment = new CommentModel({ content, user: userId, blog: blogId });
    await comment.save();
    console.log(comment);
    return res.json({ msg: "comment successfully", data: comment });
  } catch (error) {
    return res.json({
      msg: "Something went wrong with handleComment",
      error: error.message,
    });
  }
};

const handleGetComment = async (req, res) => {
  try {
    const comments = await CommentModel.find({});

    console.log(comments);

    return res.json({ msg: "comment data successfully", data: comments });
  } catch (error) {
    return res.json({ msg: "something went wrong", error: error.message });
  }
};

module.exports = { handleComment, handleGetComment };
