import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config()
export function connect() {
    mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => {console.log("Connection Successful")})
    .catch((err) => {console.log(`Error: ${err.message}`)})
}

const userSchema = new mongoose.Schema({
    id: String,
    username: String,
    name: String,
    email: String,
    firstname: String,
    lastname: String,
    DOB: String,
    gender: String,
    password: String,
    phone: String
})

export const User = mongoose.model('User', userSchema);