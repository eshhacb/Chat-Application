import express from 'express';
import dotenv from "dotenv";
import connectDB from './config/database.js';
import userRoute from "./routes/userRoute.js";
dotenv.config({});

const app=express();
const PORT=process.env.PORT || 5000;

//middleware
app.use(express.json());

//this is a middleware and this parses the data to make it available as req.body

//routes
app.use("/api/v1/user",userRoute);
// userRoute acts as middleware for all requests starting like that

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
})