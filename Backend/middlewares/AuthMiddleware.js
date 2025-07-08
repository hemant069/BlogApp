const { getUserToken } = require("../utils/auth");

const checkAuth = () => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    let token;

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized: No token provided" });
    }

    try {
      const user = getUserToken(token);
      if (user) {
        req.user = user;
        return next();
      } else {
        return res.status(401).json({ msg: "Unauthorized: Invalid token" });
      }
    } catch (error) {
      console.error("Auth error:", error);
      return res.status(401).json({ msg: "Invalid or expired token" });
    }
  };
};

module.exports = checkAuth;
