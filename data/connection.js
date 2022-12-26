import dotenv from "dotenv";
import mongoose from "mongoose" //import fresh mongoose object

dotenv.config() // load .env variables

let { connect, connection } = mongoose;

//DESTRUCTURE ENV VARIABLES
const {DATABASE_URL} = process.env 

// CONNECT TO MONGO
connect = connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

// CONNECTION EVENTS
connection
.on("open", () => console.log("DATABASE STATE", "Connection Open"))
.on("close", () => console.log("DATABASE STATE", "Connection Open"))
.on("error", (error) => console.log("DATABASE STATE", error))

// EXPORT CONNECTION
export default mongoose