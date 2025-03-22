const express = require("express");
const {
  handleReaction,
  handlegetReactions,
} = require("../controller/reaction");

const router = express.Router();

router.post("/reaction", handleReaction);
router.get("/reaction", handlegetReactions);

module.exports = { router };
