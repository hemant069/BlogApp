const express = require("express");
const { handleComment, handleGetComment } = require("../controller/comment");

const router = express.Router();

router.post("/", handleComment);
router.get("/", handleGetComment);

module.exports = router;
