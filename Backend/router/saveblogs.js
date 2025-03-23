const express = require("express");
const {
  handleSaveBlogs,
  handleGetSaveBlogs,
} = require("../controller/saveblogs");

const router = express.Router();

router.post("/", handleSaveBlogs);
router.get("/", handleGetSaveBlogs);

module.exports = router;
