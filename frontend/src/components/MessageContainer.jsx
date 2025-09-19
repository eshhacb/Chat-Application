import React, { useEffect } from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import {setSelectedUser} from '../redux/userSlice';
import { 
  Box, 
  Avatar, 
  Typography, 
  Chip,
  Paper
} from '@mui/material';
import { Person } from '@mui/icons-material';

const MessageContainer = () => {
  const {selectedUser, authUser, onlineUsers}=useSelector(store=>store.user);
  const dispatch=useDispatch();

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
    {
      selectedUser !== null ? (
        <Box sx={{ 
          flex: 1,
          minWidth: { md: 550 }, 
          display: 'flex', 
          flexDirection: 'column',
          backgroundColor: 'background.paper'
        }}>
          <Paper sx={{ 
            p: 2, 
            mb: 1, 
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 0
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ position: 'relative' }}>
                <Avatar sx={{ bgcolor: 'primary.contrastText', color: 'primary.main' }}>
                  <Person />
                </Avatar>
                {isOnline && (
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      width: 12,
                      height: 12,
                      backgroundColor: 'success.main',
                      borderRadius: '50%',
                      border: 2,
                      borderColor: 'primary.main',
                    }}
                  />
                )}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" fontWeight="bold">
                  {selectedUser?.fullName}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="caption">
                    @{selectedUser?.username}
                  </Typography>
                  {isOnline && (
                    <Chip 
                      label="Online" 
                      size="small" 
                      color="success" 
                      variant="outlined"
                      sx={{ height: 20, fontSize: '0.7rem' }}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Paper>
          <Messages/>
          <SendInput/>
        </Box>
      ):  (
        <Box sx={{ 
          flex: 1,
          minWidth: { md: 550 }, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: 'background.paper',
          p: 4
        }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Hi, {authUser?.fullName}
          </Typography>
          <Typography variant="h5" color="text.secondary">
            Let's start a conversation
          </Typography>
        </Box>
    )
  }
    </>
     
  );
};

export default MessageContainer;
