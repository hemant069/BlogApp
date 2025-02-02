const express = require("express");
const {
  handlegetblogpost,
  handlecreateblogpost,
  handlegetoneblogpost,
  handleupdateblogpost,
  handledeleteblogpost,
} = require("../controller/blog");

const router = express.Router();

router.get("/", handlegetblogpost);
router.get("/:id", handlegetoneblogpost);
router.post("/create-post", handlecreateblogpost);
router.put("/update-post/:id", handleupdateblogpost);
router.delete("/delete-post/:id", handledeleteblogpost);

module.exports = router;
