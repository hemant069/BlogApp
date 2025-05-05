const express = require("express");
const {
  handleReaction,
  handlegetReactions,
  handleGetCommentReaction,
} = require("../controller/reaction");

const router = express.Router();

router.post("/", handleReaction);
router.get("/:id", handlegetReactions);
router.get("/", handleGetCommentReaction);

module.exports = router;
