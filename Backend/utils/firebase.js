const firebase_admin = require("firebase-admin");
const dotenv = require("dotenv");
dotenv.config();

// ✅ Initialize Firebase only once in your app
firebase_admin.initializeApp({
  credential: firebase_admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"), // 🔥 Fixes newline issue
  }),
  storageBucket: "blogapp-a2b03.appspot.com",
});

const bucket = firebase_admin.storage().bucket();

module.exports = { bucket }; // ✅ Export the bucket
