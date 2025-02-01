const handlegetblogpost = async (req, res) => {
  try {
    const { id } = req.body;

    console.log(id);
  } catch (error) {}
};

module.exports = { handlegetblogpost };
