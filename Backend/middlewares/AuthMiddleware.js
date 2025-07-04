const checkAuth = () => {
  return (req, res, next) => {
    let token;
    
    // 1. Check Authorization header
    const authHeader = req.headers["authorization"];
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1]; 
    }
    
    // 2. Check NextAuth session cookies
    if (!token && req.cookies) {
      token = req.cookies["next-auth.session-token"] || 
             req.cookies["__Secure-next-auth.session-token"];
    }

    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }

    try {
      // Handle NextAuth session tokens differently than JWT
      const user = getUserToken(token);
      req.user = user;
      next();
    } catch (error) {
      return res.status(401).json({ msg: "something went wrong auth" });
    }
  };
};