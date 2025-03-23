const express = require("express");
const {
  handleSaveBlogs,
  handleGetSaveBlogs,
  handleRemoveSaveBlogs,
} = require("../controller/saveblogs");

const router = express.Router();

router.post("/", handleSaveBlogs);
router.get("/", handleGetSaveBlogs);
router.delete("/", handleRemoveSaveBlogs);

module.exports = router;
