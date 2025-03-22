const express = require("express");
const {
  handleReaction,
  handlegetReactions,
} = require("../controller/reaction");

const router = express.Router();

router.post("/", handleReaction);
router.get("/", handlegetReactions);

module.exports = router;
