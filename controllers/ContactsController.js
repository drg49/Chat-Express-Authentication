import dotenv from 'dotenv';
import { Router } from 'express';
import { isLoggedIn } from '../validation/User.js';

dotenv.config() // load env variables

const router = Router(); // create router to create route bundle

router.get("/", isLoggedIn, (req, res) => {
  try {
    res.send('Success 200.')
  }
  catch (error) {
    res.status(400).json({ error });
  }
})

export default router;