const checkAuth = async (req, res, next) => {
  const token = req.hearder;
  console.log(token);
  next();
};

module.exports = { checkAuth };
