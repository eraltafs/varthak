import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
if (!process.env.MONGO_URL) {
    throw new Error("MongoDB connection URL is not set");
}
const connection = mongoose.connect(process.env.MONGO_URL);
export { connection };
