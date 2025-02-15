const express = require("express");
const path = require("path");
const multer = require("multer");
const {
  handlegetblogpost,
  handlecreateblogpost,
  handlegetoneblogpost,
  handleupdateblogpost,
  handledeleteblogpost,
} = require("../controller/blog");

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.get("/", handlegetblogpost);
router.get("/:id", handlegetoneblogpost);
router.post("/create-post", upload.single("coverImage"), handlecreateblogpost);
router.put(
  "/update-post/:id",
  upload.single("coverImage"),
  handleupdateblogpost
);
router.delete("/delete-post/:id", handledeleteblogpost);

module.exports = router;
