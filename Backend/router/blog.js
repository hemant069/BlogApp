const express = require("express");
const path = require("path");
const multer = require("multer");
const firebase_admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();
const {
  handlegetblogpost,
  handlecreateblogpost,
  handlegetoneblogpost,
  handleupdateblogpost,
  handledeleteblogpost,
} = require("../controller/blog");

const router = express.Router();

firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY,
  }),
  storageBucket: "blogapp-a2b03.appspot.com",
});

const bucket = firebase_admin.storage().bucket();

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
