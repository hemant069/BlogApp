const { getUserToken } = require("../utils/auth");

const checkAuth = () => {
  return (req, res, next) => {
    const userIdToken = req?.headers["authorization"];

    if (!userIdToken) return res.status(401).json({ msg: "Unauthorized" });

    const token = userIdToken?.split("Bearer ")[1];

    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    try {
      console.log("token baby", token);
      const user = getUserToken(token);
      console.log("Check AUth", user);
      req.user = user;

      next();
    } catch (error) {
      return res.status(401).json({ msg: "something went wrong auth" });
    }
  };
};

module.exports = { checkAuth };
