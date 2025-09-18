import { useState, useEffect } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomePage from './components/HomePage.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import OTP from './components/Otp.jsx'
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
      const backendUrl = import.meta.env.VITE_BACKEND_URL || '/';
      const socket=io(backendUrl,{
        path:'/socket',
        reconnection:true,
        transports: ['websocket','polling'],
        query:{ userId: authUser._id },
        withCredentials: true,
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


