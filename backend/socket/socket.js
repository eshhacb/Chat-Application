import dotenv from 'dotenv';
import { Server } from "socket.io";
import http from 'http';
import express from 'express';

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    path: '/socket',
    wssEngine: ['ws'],
    transports: ['websocket', 'polling'],
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId -> socketId}

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
    });
});

export { app, io, server };
