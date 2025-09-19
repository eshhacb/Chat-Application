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
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Box } from '@mui/material'

// Create Material UI theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

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
        // Use default Socket.IO path '/socket.io' to match server and Vite proxy
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
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box 
        sx={{ 
          minHeight: '100vh', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'background.default'
        }}
      >
        <RouterProvider router={router}/>
      </Box>
    </ThemeProvider>
  );
}
export default App;


