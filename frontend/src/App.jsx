import { useState, useEffect } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomePage from './components/HomePage.jsx'
import Signup from './components/Signup.jsx'
import Login from '../src/components/Login.jsx'
import OTP from './components/otp.jsx'
import { useDispatch, useSelector } from 'react-redux'
import io from "socket.io-client"
import { setSocket } from './redux/socketSlice.js'
import { setOnlineUsers } from './redux/userSlice.js'
import ProtectedRoute from './components/ProtectedRoute.jsx'

const router=createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:'/otpAuth',
    element:<OTP/>

  },
  {
    path:"/home",
    element:<ProtectedRoute><HomePage/></ProtectedRoute>
  }
])

function App() {
  const { authUser } = useSelector(store => store.user);
  const {socket}=useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      const socket=io('http://localhost:8080',{
        path:'/socket',
        reconnection:'true',
        transports: ['websocket','polling'],
        query:{
          userId: authUser._id},
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers',(onlineUsers)=>{
          dispatch(setOnlineUsers(onlineUsers))
      });
      return ()=>{
        socket.close();
        dispatch(setSocket(null));
      }
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser])


  return (
    <>
      <div className=" h-screen flex items-center justify-center">
        <RouterProvider router={router}/>
      </div>
    </>
  );
}
export default App;


