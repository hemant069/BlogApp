const SaveModel = require("../model/SaveblogModel");

const handleSaveBlogs = async (req, res) => {
  try {
    const { userId, blogId } = req.body;

    const existingBlogId = await SaveModel.findOne({ blogId: blogId });

    if (!existingBlogId) {
      const saveblogs = new SaveModel({ userId, blogId });

      await saveblogs.save();

      return res.json({ msg: "blog saved successfully", data: saveblogs });
    } else {
      return res.json({ msg: "Already Saved blog" });
    }
  } catch (error) {
    return res.json({
      msg: "something went wrong with handleSaveBlogs",
      error: error.message,
    });
  }
};

const handleRemoveSaveBlogs = async (req, res) => {
  try {
    const { blogId } = req.body;

    await SaveModel.findOneAndDelete({ blogId });

    return res.json({ msg: "blog removed successfully" });
  } catch (error) {
    return res.json({
      msg: "something went wrong with handleremovesaveblog",
      error: error.message,
    });
  }
};

const handleGetSaveBlogs = async (req, res) => {
  const { id } = req.params;
  try {
    const saveblogs = await SaveModel.findOne({ blogId: id });

    return res.json({ msg: "save blogs get success", data: saveblogs });
  } catch (error) {
    return res.json({
      msg: "somethin went wrong with handlegetblogs",
      error: error.message,
    });
  }
};

const handleGetSavedBlogsForUser = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id, "Hello world");

    const savedBlog = await SaveModel.find({ userId: id })
      .populate("userId")
      .populate("blogId");
    return res.json({ msg: "saved blogs for user", data: savedBlog });
  } catch (error) {
    return res.json({ msg: "something went wrong", error: error.message });
  }
};

module.exports = {
  handleSaveBlogs,
  handleGetSaveBlogs,
  handleRemoveSaveBlogs,
  handleGetSavedBlogsForUser,
};
