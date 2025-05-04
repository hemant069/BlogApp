const express = require("express");
const {
  handleReaction,
  handlegetReactions,
  handleCommentReaction,
} = require("../controller/reaction");

const router = express.Router();

router.post("/", handleReaction);
router.post("/comment", handleCommentReaction);
router.get("/:id", handlegetReactions);

module.exports = router;
