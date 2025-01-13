import {Server} from "socket.io"
import http from 'http'
import express from 'express'
import cors from 'cors';

const app=express();

const server=http.createServer(app);
const io=new Server(server,{
    path:'/socket',
    wssEngine:['ws'],
    transports:['websocket'],
    cors:{
        origin:['http://localhost:5173'],
        methods:['GET','POST'],
    },
});
io.on('connection',(socket)=>{
    console.log('user connected', socket.id);
})

export {app,io,server};