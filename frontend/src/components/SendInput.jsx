import React, { useState } from 'react'
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import { 
  Box, 
  TextField, 
  IconButton, 
  Paper 
} from '@mui/material';
import { Send } from '@mui/icons-material';

const SendInput = () => {
     const [message,setMessage]=useState('');
     const dispatch=useDispatch();
     const {selectedUser}=useSelector(store=>store.user);
     const {messages}=useSelector(store=>store.message);

     const onSubmitHandler=async (e)=>{
          e.preventDefault();
          try{
               const res=await axios.post(`/api/v1/message/send/${selectedUser?._id}`,{message}, {
                    headers:{
                        'Content-Type':'application/json'
                    },
                    withCredentials:true
                });
                // Optimistically add message; server will emit real-time event for receiver
                dispatch(setMessages([...(messages || []), res?.data?.newMessage]))
               console.log(res);
          }catch(error){
               console.log(error);
          }
          setMessage("");
     }

  return (
   <Box component="form" onSubmit={onSubmitHandler} sx={{ p: 2 }}>
        <Paper sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          p: 1,
          backgroundColor: 'background.paper',
          border: 1,
          borderColor: 'divider'
        }}>
            <TextField
                fullWidth
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  sx: { px: 1 }
                }}
                sx={{ flex: 1 }}
            />
            <IconButton 
                type="submit"
                color="primary"
                disabled={!message.trim()}
            >
                <Send />
            </IconButton>
        </Paper>
   </Box>
  )
}

export default SendInput