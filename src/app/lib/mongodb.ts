import mongoose from "mongoose";

export const connectMongoDB = async () => {

    try {
        
        console.log("process.env.MONGO_DB_URI", process.env.MONGO_DB_URI as string);

        await mongoose.connect("mongodb://localhost:27017/testing");

        console.log("Connected to Mongo database");

    } catch(error) {

        console.log("Error connecting to Mongo database", error);
    }
};