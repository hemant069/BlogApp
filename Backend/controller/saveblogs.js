const SaveModel = require("../model/SaveblogModel");

const handleSaveBlogs = async (req, res) => {
  try {
    const { userId, blogId } = req.body;

    const existingBlogId = SaveModel.findOne({ blogId });

    if (!blogId) {
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

const handleGetSaveBlogs = async (req, res) => {
  try {
    const saveblogs = await SaveModel.find({}).populate("blogId");

    return res.json({ msg: "save blogs get success", data: saveblogs });
  } catch (error) {
    return res.json({
      msg: "somethin went wrong with handlegetblogs",
      error: error.message,
    });
  }
};

const handleRemoveSaveBlogs = async (req, res) => {
  try {
    const { blogId } = req.body;

    const blog = await SaveModel.findOneAndDelete({ blogId });

    return res.json({ msg: "blog removed successfully" });
  } catch (error) {
    return res.json({
      msg: "something went wrong with handleremovesaveblog",
      error: error.message,
    });
  }
};

module.exports = { handleSaveBlogs, handleGetSaveBlogs, handleRemoveSaveBlogs };
