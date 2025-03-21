const express = require("express");
const { handleReaction } = require("../controller/reaction");

const router = express.Router();

router.post("/reaction", handleReaction);

module.exports = { router };
