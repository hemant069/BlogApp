const { getUserToken } = require("../utils/auth");

const checkAuth = () => {
  return (req, res, next) => {
    const userIdToken = req?.headers["authorization"];
let token
    console.log(req.cookies)

 const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split("Bearer ")[1];
    }

    // 2. Try cookies (NextAuth stores it here)
    if (!token && req.cookies) {
      token =
        req.cookies["next-auth.session-token"] ||
        req.cookies["next-auth.session-token"];
    }

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

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
