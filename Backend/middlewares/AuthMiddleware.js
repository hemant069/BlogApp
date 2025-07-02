const { getUserToken } = require("../utils/auth");

const checkAuth = () => {
  return (req, res, next) => {
    let token
const authHeader = req.headers["authorization"];
if (authHeader && authHeader.startsWith("Bearer ")) {
  token = authHeader.split(" ")[1]; 
}


    console.log("Yo Yo Token Singh",token)
    // 2. Try cookies (NextAuth stores it here)
//     if (token==="undefined" && req.cookies) {
// console.log("req cookies",req.cookies)
//       token =
//         req.cookies["next-auth.session-token"] ||
//         req.cookies["next-auth.session-token"];
//     }

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
