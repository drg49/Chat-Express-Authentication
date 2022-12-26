import dotenv from "dotenv"; // import env variables
import express, {json} from "express"; // import express
import morgan from "morgan"; //import morgan
import cors from "cors"; // import cors
import UserController from "./controllers/UserController.js";
import "./data/connection.js";

dotenv.config()// load .env variables

//DESTRUCTURE ENV VARIABLES WITH DEFAULT VALUES
const {PORT = 4000} = process.env

// Create Application Object
const app = express()

// GLOBAL MIDDLEWARE
app.use(cors()) // add cors headers
app.use(morgan("tiny")) // log the request for debugging
app.use(json()) // parse json bodies

// ROUTES AND ROUTES
app.get("/", (req, res) => {
    res.send("this is the test route to make sure server is working")
})

app.use("/user", UserController);

// APP LISTENER
app.listen(PORT, () => console.log("SERVER STATUS", `Listening on port ${PORT}`))