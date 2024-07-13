import Express from "express";
import mongoose, { mongo } from "mongoose";
import 'dotenv/config'
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    });

const app = Express();

app.listen(3100, () => {
    console.log("Server is running on port 3100");
})