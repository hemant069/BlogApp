const { getUserToken } = require("../utils/auth");

const checkAuth = () => {
  return (req, res, next) => {
    let token
      const authHeader = req.headers["authorization"];
      if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1]; 
}


   

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    try {
      console.log("token baby", token);
      const user = getUserToken(token);
      if(user){

        req.user = user;
        next();
      }

    } catch (error) {
      return res.status(401).json({ msg: "something went wrong auth" });
    }
  };
};

module.exports =  checkAuth ;