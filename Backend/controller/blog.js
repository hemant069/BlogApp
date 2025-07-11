const BlogModel = require("../model/blogModel");
const cloudnary = require(".././utils/cloudnary");
const handlecreateblogpost = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: "Please Upload image" });
    }

    const { title, content, tag } = req.body;
    const tagArray = tag.split(",");

    // Wrap cloudinary stream in a Promise
    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudnary.uploader.upload_stream(
          { folder: "blog_covers" }, // optional
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );
        stream.end(req.file.buffer);
      });
    };

    const result = await uploadToCloudinary();

    const createdBlogpost = new BlogModel({
      title,
      content,
      coverImgUrl: result.secure_url,
      createdBy: req.user.id,
      tag: tagArray,
    });

    await createdBlogpost.save();

    return res.status(201).json({
      msg: "blog created successfully",
      data: createdBlogpost,
    });
  } catch (err) {
    console.error("Error creating blog post:", err);
    return res.status(500).json({ msg: "Something went wrong", error: err.message });
  }
};


const handlegetblogpost = async (req, res) => {
  try {
    const getAllblogpost = await BlogModel.find({}).populate(
      "createdBy",
      "username email profileImg"
    ).lean();; // Fetch only required fields

    return res
      .status(200)
      .json({ msg: "All blog posts", data: getAllblogpost });
  } catch (error) {
    return res.status(500).json({
      msg: "Something went wrong with getblogpost",
      error: error.message,
    });
  }
};

const handlegetoneblogpost = async (req, res) => {
  try {
    const { id } = req.params;
    const getOneblogpost = await BlogModel.findOne({ _id: id }).populate(
      "createdBy"
    );
    return res
      .status(200)
      .send({ msg: "blog post get successfully", data: getOneblogpost });
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
