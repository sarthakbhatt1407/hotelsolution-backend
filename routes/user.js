const express = require("express");
const router = express.Router();
const usersController = require("../controller/userController");

// User Controls
router.post("/sign-up", usersController.userSignUp);
router.post("/login", usersController.userLogin);

module.exports = router;
