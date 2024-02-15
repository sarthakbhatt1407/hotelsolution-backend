const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

var crypto = require("crypto");
var assert = require("assert");

var algorithm = "aes256"; // or any other algorithm supported by OpenSSL
var key = "password";

const userSignUp = async (req, res) => {
  const { name, password } = req.body;
  const hashedPass = await bcrypt.hash(password, 12);
  const createdUser = new User({
    name,
    password: hashedPass,
  });

  try {
    await createdUser.save();
  } catch (err) {
    return res.status(404).json({ message: "Something went wrong...", err });
  }
  return res.status(201).json({ msg: "User Created" });
};

const userLogin = async (req, res, next) => {
  const { userId, password } = req.body;
  let user;
  let passIsValid = false;
  const decipher = crypto.createDecipher(algorithm, key);
  const decrypted =
    decipher.update(
      "6f8b526bd2a81bc4d9725bda0f7741db9e46213aa7863ff6866228536ef90b37",
      "hex",
      "utf8"
    ) + decipher.final("utf8");

  try {
    user = await User.findById(userId);

    if (!user) {
      throw new Error();
    }
  } catch (err) {
    return res.status(404).json({ message: "Invalid Credentials", err });
  }

  passIsValid = await bcrypt.compare(password, user.password);
  if (user && passIsValid) {
    user.password = "Keep Guessing";
    res.json({
      useruserId: user.userId,
      userId: user.id,
      message: "Logged In",
      isloggedIn: true,
    });
  } else {
    res.status(404).json({ message: "Invalid Credentials" });
  }
};

exports.userSignUp = userSignUp;
exports.userLogin = userLogin;
