const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const multer = require("multer");
const path = require("path");

// Multer setup (can also be extracted into a separate file for reuse)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname); // Path to store the profile pictures
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Timestamped file name
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB limit
});

// Apply the 'upload.single' middleware for handling the profile picture
router.post("/signup", upload.single("profilePic"), authController.signup);
router.post("/login", authController.login);

module.exports = router;
