const BlogModel = require("../model/blogModel");

const handlecreateblogpost = async (req, res) => {
  try {
    const { title, content } = req.body;

    const createdBlogpost = new BlogModel({
      title,
      content,
      coverImgUrl: `./uploads/${req.file.originalname}`,
      // createdBy: req.user._id,
    });
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

const handlegetoneblogpost = async (req, res) => {
  try {
    const { id } = req.params;
    const getOneblogpost = await BlogModel.findOne({ _id: id });
    return res.status(200).send({ msg: "all blog post", post: getOneblogpost });
  } catch (error) {
    return res.status(404).json({
      msg: "Something went wrong wih getblogonepost",
      error: error.message,
    });
  }
};

const handleupdateblogpost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    const updatedBlog = await BlogModel.findOneAndUpdate(
      { _id: id },
      {
        $set: { title, content, coverImgUrl: `./uploads${req.file.filename}` },
      },
      { new: true }
    );

    if (!updatedBlog) {
      return res.status(404).json({ msg: "No blog post found with this ID" });
    }

    return res.status(201).json({
      msg: "Post updated successfully",
      update: updatedBlog,
    });
  } catch (error) {
    return res
      .status(401)
      .json({ msg: "something went wrong updatepost", error: error.message });
  }
};

const handledeleteblogpost = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedpost = await BlogModel.deleteOne({ _id: id });
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
  handlegetoneblogpost,
};
