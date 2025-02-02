const BlogModel = require("../model/blogModel");

const handlecreateblogpost = async (req, res) => {
  try {
    const { title, content, coverImgUrl } = req.body;

    const createdBlogpost = new BlogModel({ title, content, coverImgUrl });
    await createdBlogpost.save();

    return res.status(201).json({ msg: "blog created successfully" });
  } catch (error) {
    return res.status(404).json({
      msg: "Something went wrong wih createblogpost",
      error: error.message,
    });
  }
};

const handlegetblogpost = async (req, res) => {
  try {
    const getAllblogpost = await BlogModel.find({});
    return res.status(200).send({ msg: "all blog post", post: getAllblogpost });
  } catch (error) {
    return res.status(404).json({
      msg: "Something went wrong wih getblogpost",
      error: error.message,
    });
  }
};

const handleupdateblogpost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, coverImgUrl } = req.body;

    const updatedBlog = await BlogModel.findAndUpdate(
      { id },
      { $set: { title, content, coverImgUrl } },
      { new: true }
    );

    updatedBlog.save();

    return res.status(201).status({ msg: "post updated successfully" });
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "something went wrong updatepost", error: error.message });
  }
};

const handledeleteblogpost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedpost = await BlogModel.deleteOne({ id });
    return res.status(201).json({ msg: "post delete successfully" });
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "something wrong with deletepost", error: error.message });
  }
};

module.exports = {
  handlegetblogpost,
  handlecreateblogpost,
  handleupdateblogpost,
  handledeleteblogpost,
};
