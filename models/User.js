import mongoose from "../data/connection.js";
const { Schema, model } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        min: [3, 'Username must be 3 or more characters.'],
        max: [15, 'Username cannot exceed 15 characters.']
    },
    password: {
        type: String,
        required: true,
        min: [3, 'Password must be 4 or more characters.'],
        max: [15, 'Username cannot exceed 15 characters.']
    },
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

const User = model("User", UserSchema);

export default User;