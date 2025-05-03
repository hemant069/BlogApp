const express = require("express");
const {
  handleSaveBlogs,
  handleGetSaveBlogs,
  handleRemoveSaveBlogs,
  handleGetSavedBlogsForUser,
} = require("../controller/saveblogs");

const router = express.Router();

router.post("/", handleSaveBlogs);
router.get("/:id", handleGetSaveBlogs);
router.get("/user/:id", handleGetSavedBlogsForUser);
router.delete("/", handleRemoveSaveBlogs);

module.exports = router;
