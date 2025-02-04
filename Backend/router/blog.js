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

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-` + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/", handlegetblogpost);
router.get("/:id", handlegetoneblogpost);
router.post("/create-post", upload.single("coverImage"), handlecreateblogpost);
router.put("/update-post/:id", handleupdateblogpost);
router.delete("/delete-post/:id", handledeleteblogpost);

module.exports = router;
