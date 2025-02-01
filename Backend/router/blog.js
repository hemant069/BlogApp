const express = require("express");
const { handlegetblogpost } = require("../controller/blog");

const router = express.Router();

router.get("/", handlegetblogpost);
// router.post();
// router.put();
// router.delete();

module.exports = router;
