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
const { checkAuth } = require("../middlewares/AuthMiddleware");

const router = express.Router();
// upload for the multer storage
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", handlegetblogpost);
router.get("/:id", handlegetoneblogpost);
router.post(
  "/create-post",

  upload.single("coverImgUrl"),
  handlecreateblogpost
);
router.put(
  "/update-post/:id",
  upload.single("coverImgUrl"),
  handleupdateblogpost
);
router.delete("/delete-post/:id", handledeleteblogpost);

module.exports = router;
