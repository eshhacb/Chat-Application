import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/database.js';
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import {app,server} from './socket/socket.js'
dotenv.config({});

const PORT=process.env.PORT || 5000;

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOption={
    origin: process.env.FRONTEND_URL,
    credentials:true
};
app.use(cors(corsOption));

//this is a middleware and this parses the data to make it available as req.body

//routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute)
// userRoute acts as middleware for all requests starting like that

server.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
})