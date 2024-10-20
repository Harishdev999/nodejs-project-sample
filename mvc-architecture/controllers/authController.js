const Signup = require("../models/signupModel");
const bcrypt = require("bcrypt");


async function toEncrypt(input) {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(input, salt);
  } catch (e) {
    console.log(e);
  }
}

async function comparePasswords(password, hashedPassword) {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (e) {
    console.log(e);
  }
}

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const profilePic = req.file;
  console.log(name, email, password,profilePic);

  if (!name || !email || !password) {
    return res.status(400).send({ message: "please fill all fields" });
  }

  const existingUser = await Signup.findOne({ email });
  if (existingUser) {
    return res.status(409).send({ message: "email already exists" });
  }

  const encryptedPswd = await toEncrypt(password);
  const signupData = new Signup({
    name: name,
    email: email,
    password: encryptedPswd,
    profilePic: profilePic ? profilePic.path : null,
  });

  await signupData.save();
  res.status(201).send({ message: "registered successfully" });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send({ message: "please fill all fields" });
  }

  const user = await Signup.findOne({ email });
  if (!user) {
    return res.status(401).send({ message: "invalid email" });
  }

  const isValidPassword = await comparePasswords(password, user.password);
  if (!isValidPassword) {
    return res.status(401).send({ message: "invalid password" });
  }

  res.status(200).send({ message: "login successful" });
};
