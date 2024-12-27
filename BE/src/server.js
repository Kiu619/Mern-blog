import express from "express";
import mongoose, { mongo } from "mongoose";
import 'dotenv/config'
import { env } from "./config/environment.js";
// vì type là module nên phải thêm .j
import APIs_V1 from "./routes/v1/index.js";
import { errorHandlingMiddleware } from "./middleware/errorHandlingMiddleware.js";
import { corsOptions } from "./config/cors.js";
import cors from "cors";
import cookieParser from 'cookie-parser';
mongoose
    .connect(env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    });

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.listen(env.APP_PORT, env.APP_HOST, () => {
    console.log(`Server running at http://${env.APP_HOST}:${env.APP_PORT}/`)
})

app.use('/v1', APIs_V1)
app.use(errorHandlingMiddleware)
