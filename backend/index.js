import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/database.js';
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser"
dotenv.config({});

const app=express();
const PORT=process.env.PORT || 5000;

//middleware
app.use(express.json());
app.use(cookieParser());

//this is a middleware and this parses the data to make it available as req.body

//routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute)
// userRoute acts as middleware for all requests starting like that

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
})