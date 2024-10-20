const mongoose = require("mongoose");

const signupSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profilePic:String
});

const Signup = mongoose.model("Signup", signupSchema);

module.exports = Signup;
