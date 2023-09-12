import mongoose from "mongoose";
import * as dotenv from 'dotenv';

dotenv.config()
export function connect() {
    mongoose.connect(`${process.env.MONGO_URI}`)
    .then(() => {console.log("Connection Successful")})
    .catch((err) => {console.log(`Error: ${err.message}`)})
}