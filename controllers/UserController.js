import dotenv from 'dotenv';
import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

dotenv.config() // load env variables

const router = Router(); // create router to create route bundle

const { SECRET = "secret" } = process.env;

// Signup route to create a new user
router.post("/register", async (req, res) => {
  try {
    // hash the password
    req.body.password = await bcrypt.hash(req.body.password, 10);
    // create a new user
    const user = await User.create(req.body);
    // send new user as response
    res.json(user);
  }
  catch (error) {
    console.error(error)
    res.status(400).json({ error: "Hello Wotld" });
  }
});

// Login route to verify a user and get a token
router.post("/login", async (req, res) => {
  try {
    // check if the user exists
    const user = await User.findOne({ username: req.body.username });
    console.log(user)

    if (user) {
      //check if password matches
      const result = await bcrypt.compare(req.body.password, user.password);
      
      if (result) {
        // sign token and send it in response
        const token = jwt.sign({ username: user.username }, SECRET);
        res.json({ token });
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
    console.log(error)
    res.status(400).json({ error });
  }
});

export default router;