import { Server } from "socket.io";
import http from 'http';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config({});

const app = express();

const server = http.createServer(app);

// Allow configuring frontend origin for Socket.IO CORS in deployment
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:8080';

const io = new Server(server, {
    path: '/socket',
    wssEngine: ['ws'],
    transports: ['websocket', 'polling'],
    cors: {
        origin: FRONTEND_ORIGIN,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const userSocketMap = {}; // { userId -> socketId }

// Handle connections
io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== 'undefined') {
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
        // broadcast again
    });
});

export { app, io, server };