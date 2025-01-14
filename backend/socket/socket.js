import {Server} from "socket.io"
import http from 'http'
import express from 'express'


const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    path:'/socket',
    wssEngine:['ws'],
    transports:['websocket','polling'],
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET','POST'],
    },
});

export const getReceiverSocketId=(receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap={}; //{userId->socketId}

//connection is predefined even in socke.io
io.on('connection',(socket)=>{
    console.log('user connected', socket.id);

    const userId=socket.handshake.query.userId
    if(userId!== undefined){
        userSocketMap[userId]=socket.id;
    }

    io.emit('getOnlineUsers',Object.keys(userSocketMap));

    socket.on('disconnect',()=>{
        console.log('user disconnected', socket.id);
        delete userSocketMap[userId];
        io.emit('getOnlineUsers',Object.keys(userSocketMap));
        //broadcasted again
    })
})

export {app,io,server};