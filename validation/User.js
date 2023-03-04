import dotenv from "dotenv";
import jwt from 'jsonwebtoken';
import User from "../models/User.js";
import { getCookies } from "../utils/helpers.js";

dotenv.config();

const { SECRET } = process.env;

// MIDDLEWARE FOR AUTHORIZATION (MAKING SURE THEY ARE LOGGED IN)
export const isLoggedIn = async (req, res, next) => {
  try {
    // check if cookie header exists
    if (req.headers.cookie) {
      const cookies = getCookies(req);
      
      if (cookies.token) {
        const payload = jwt.verify(cookies.token, SECRET);

        if (payload) {
          // store user data in request object
          req.user = payload;
          next();
        }
        else {
          res.status(400).json({ error: "Failed to verify token." });
        }
      }
      else {
        res.status(400).json({ error: "The token could not be found." });
      }
    }
    else {
      res.status(400).json({ error: "No cookie header was provided." });
    }
  }
  catch (error) {
    res.status(400).json({ error });
  }
};

export const canRegister = async (req, res, next) => {
  const { email, username } = req.body;

  if (email === null || email === '') {
    res.status(400).json({ error: 'No email was provided.'})
  }
  else if (!email.includes('@') || !email.includes('.')) {
    res.status(400).json({ error: 'Email address not valid.'})
  }
  else if (await User.findOne( { username })) {
    res.status(400).json({ error: 'Username already exists.'})
  }
  else if (await User.findOne({ email })) {
    res.status(400).json({ error: 'Email address is already registered.'})
  }
  else {
    next();
  }
};