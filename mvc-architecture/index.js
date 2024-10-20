const express = require("express");
const app = express();
const { dbConnect } = require("./db");
const authRoutes = require("./routes/routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
dbConnect();

// Routes
app.use("/auth", authRoutes);

// Start the server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
