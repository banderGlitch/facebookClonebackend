const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// Register
router.post("/register", async (req, res) => {
  try {
    // Check if user with the provided email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json("User with this email already exists.");
    }
    // Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save user to the database
    const user = await newUser.save();
    res.status(200).json({user, message : "User registered successfully", authorized : true});
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "user not found", authorized: false });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "wrong password", authorized: false });
    }

    // If user is found and password is correct
    res
      .status(200)
      .json({ user, message: "Login Successful", authorized: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
