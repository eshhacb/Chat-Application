import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { 
  Box, 
  Avatar, 
  Typography, 
  Paper 
} from '@mui/material';
import { Person } from '@mui/icons-material';

const Message = ({message}) => {
  const scroll=useRef();
  const {authUser,selectedUser}=useSelector(store=>store.user);
  const isOwnMessage = message?.senderId === authUser?._id;
  
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:'smooth'});
  },[message]);

  return (
    <Box 
      ref={scroll} 
      sx={{ 
        display: 'flex', 
        justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
        mb: 2,
        px: 1
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'flex-end',
        gap: 1,
        maxWidth: '70%',
        flexDirection: isOwnMessage ? 'row-reverse' : 'row'
      }}>
        <Avatar sx={{ 
          width: 32, 
          height: 32,
          bgcolor: isOwnMessage ? 'primary.main' : 'secondary.main'
        }}>
          <Person />
        </Avatar>
        <Paper sx={{ 
          p: 1.5,
          backgroundColor: isOwnMessage ? 'primary.main' : 'grey.100',
          color: isOwnMessage ? 'primary.contrastText' : 'text.primary',
          borderRadius: 2,
          position: 'relative'
        }}>
          <Typography variant="body2">
            {message?.message}
          </Typography>
          <Typography 
            variant="caption" 
            sx={{ 
              display: 'block',
              opacity: 0.7,
              textAlign: 'right',
              mt: 0.5
            }}
          >
            12:45
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}

export default Message