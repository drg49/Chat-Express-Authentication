import dotenv from 'dotenv';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { canRegister, isLoggedIn } from '../validation/User.js';

dotenv.config() // load env variables

const router = Router();

const { SECRET } = process.env;

router.post("/register", canRegister, async (req, res) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    const user = await User.create(req.body);
    // send new user as response
    res.json(user);
  }
  catch (error) {
    res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  try {
    let user;

    if (req.body.usernameOrEmail.includes('@')) {
      user = await User.findOne({ email: req.body.usernameOrEmail });
    }
    else {
      user = await User.findOne({ username: req.body.usernameOrEmail });
    }

    if (user) {
      // check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      
      if (result) {
        // sign token and store it in cookies
        const token = jwt.sign({ username: user.username }, SECRET);
        res.cookie('token', token);
        res.status(200).json({ message: 'Login successful.' });
      }
      else {
        res.status(400).json({ error: "Password does not match." });
      }
    }
    else {
      res.status(400).json({ error: "User does not exist." });
    }
  }
  catch (error) {
    res.status(400).json({ error: "Failed to login user." });
  }
});

router.post("/validate", isLoggedIn, (req, res) => {
  try {
    res.status(200).json({ message: 'User logged in.' });
  }
  catch (error) {
    res.status(400).json({ error: 'Failed to authorize user' });
  }
});

export default router;