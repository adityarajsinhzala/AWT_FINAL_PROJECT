import mongoose from "mongoose";

const MONGO_URI = "mongodb://localhost:27017/mydb";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Mongo connected");
    } catch (err) {
        console.error("Mongo conn err:", err);
        process.exit(1);
    }
};