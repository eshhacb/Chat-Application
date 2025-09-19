import React from 'react'
import Message from './Message'
import useGetMessages from '../hooks/useGetMessages'
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';
import { Box } from '@mui/material';

const Messages = () => {
    useGetMessages();
    useGetRealTimeMessage();
  const {messages}=useSelector(store=>store.message);
  return (
    <Box sx={{ px: 2, flex: 1, overflow: 'auto' }}>
        {
           messages && messages?.map((message) => {
                return (
                    <Message key={message._id} message={message} />
                )
            })
        }
    </Box>
)
}

export default Messages