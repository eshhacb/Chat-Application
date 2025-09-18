import { Server } from "socket.io";
import http from 'http';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config({});

const app = express();

const server = http.createServer(app);

// Same-origin deployment: allow the current origin dynamically
const io = new Server(server, {
    path: '/socket',
    transports: ['websocket', 'polling'],
    cors: {
        origin: true,
        methods: ['GET', 'POST'],
        credentials: true,
    },
});

// Multiple sockets per userId
const userSocketMap = new Map(); // userId -> Set(socketId)

export const getReceiverSocketIds = (receiverId) => {
    return Array.from(userSocketMap.get(receiverId) || []);
};

// Handle connections
io.on('connection', (socket) => {
    console.log('user connected', socket.id);

    const userId = socket.handshake?.query?.userId; // or switch to handshake.auth if preferred
    if (userId && userId !== 'undefined') {
        if (!userSocketMap.has(userId)) userSocketMap.set(userId, new Set());
        userSocketMap.get(userId).add(socket.id);
        console.log('Mapped user', userId, '->', socket.id);
    }

    io.emit('getOnlineUsers', Array.from(userSocketMap.keys()));

    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
        if (userId) {
            const set = userSocketMap.get(userId);
            if (set) {
                set.delete(socket.id);
                if (set.size === 0) userSocketMap.delete(userId);
            }
        }
        io.emit('getOnlineUsers', Array.from(userSocketMap.keys()));
    });
});

export { app, io, server };