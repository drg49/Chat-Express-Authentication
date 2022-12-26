import mongoose from "../data/connection.js";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        min: [3, 'Username must be 3 or more characters.'],
        max: [15, 'Username cannot exceed 15 characters.']
    },
    password: {
        type: String,
        required: true,
        min: [3, 'Password must be 4 or more characters.'],
        max: [15, 'Username cannot exceed 15 characters.']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now 
    }
})

const User = model("Users", UserSchema);

export default User;