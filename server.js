import dotenv from "dotenv";
import express, {json} from "express";
import morgan from "morgan";
import cors from "cors";
import UserController from "./controllers/UserController.js";
import ContactsController from "./controllers/ContactsController.js";
import "./data/connection.js";

dotenv.config(); // Load .env variables

const { PORT = 4000 } = process.env;

const app = express(); // Create Application Object

// GLOBAL MIDDLEWARE
app.use(cors({ origin: true, credentials: true })); // Add cors headers
app.use(morgan("tiny")); // log the request for debugging
app.use(json()); // Parse json bodies

app.get("/", (req, res) => {
    res.send("The express chat server is running.")
});

app.use("/user", UserController);
app.use("/contacts", ContactsController);

// APP LISTENER
app.listen(PORT, () => console.log("SERVER STATUS", `Listening on port ${PORT}`))