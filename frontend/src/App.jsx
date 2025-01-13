import { useState, useEffect } from 'react'
import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import HomePage from './components/HomePage.jsx'
import Signup from './components/Signup.jsx'
import Login from '../src/components/Login.jsx'
import { useSelector } from 'react-redux'
import io from "socket.io-client"

const router=createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/signup",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  }
])

 function App() {
  const [socket, setSocket]=useState(null)
  const {authUser}=useSelector(store=>store.user);

  useEffect(()=>{
    if(authUser){
      const socket=io('http://localhost:8080',{
        path:'/socket',
        reconnection:'true',
        transports: ['websocket'],
      });
    

      setSocket(socket);

     
    }
  },[authUser])

  return (
    <>
        <div className="p-4 h-screen flex items-center justify-center">
          <RouterProvider router={router}/>
        </div>
    </>
  );
}
export default App;


