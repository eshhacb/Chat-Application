import express from 'express';
import dotenv from "dotenv";
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { app, server } from './socket/socket.js';

dotenv.config({});

const PORT = process.env.PORT || 8080;

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Allow configuring frontend origin via env for deployment
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:8080';
const corsOption = {
    origin: FRONTEND_ORIGIN,
    credentials: true
};
app.use(cors(corsOption));

//this is a middleware and this parses the data to make it available as req.body

//routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute)
// userRoute acts as middleware for all requests starting like that
// deployment (serve frontend in production)
const __filename = fileURLToPath(import.meta.url);
const __dirname1 = path.dirname(__filename);

// Serve frontend if built dist exists OR in production
const clientDistPath = path.join(__dirname1, "../frontend/dist");
const hasClientBuild = fs.existsSync(path.join(clientDistPath, "index.html"));

if (process.env.NODE_ENV === "production" || hasClientBuild) {
    app.use(express.static(clientDistPath));
    app.get("*", (req, res) => {
        res.sendFile(path.join(clientDistPath, "index.html"));
    });
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
    });
}

server.listen(PORT, () => {
    connectDB();
    console.log(`Server listening at port ${PORT}`);
});