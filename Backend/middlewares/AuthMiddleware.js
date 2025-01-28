const { getUserToken } = require("../utils/auth");

const checkAuth = () => {
  return (req, res, next) => {
    const userIdToken = req.headers["authorization"];

    const token = userIdToken.split("Bearer ")[1];

    if (!token) return next();

    const user = getUserToken(token);

    req.user = user;

    next();
  };
};

module.exports = { checkAuth };
