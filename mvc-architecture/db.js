const mongoose = require("mongoose");
require("dotenv").config(); // Load .env file contents

async function dbConnect() {
  const dbUri = process.env.MONGO_URI; // Get URI from .env

  if (!dbUri) {
    console.error("MongoDB URI is not defined in environment variables.");
    return;
  }

  try {
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database");
  } catch (error) {
    console.log("Database connection error:", error);
  }
}

module.exports = { dbConnect };
