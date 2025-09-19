import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import { 
  Box, 
  Avatar, 
  Typography, 
  ListItem, 
  ListItemAvatar, 
  ListItemText,
  Chip
} from '@mui/material';
import { Person } from '@mui/icons-material';

const OtherUser = ({user}) => {
  
  const dispatch=useDispatch();
  const {selectedUser, onlineUsers} = useSelector(store=>store.user);
  const isOnline= onlineUsers?.includes(user._id);

  const selectedUserHandler=(user)=>{
    dispatch(setSelectedUser(user));
  }

  return (
    <ListItem
      button
      onClick={() => selectedUserHandler(user)}
      sx={{
        backgroundColor: selectedUser?._id === user?._id ? 'action.selected' : 'transparent',
        borderRadius: 1,
        mb: 0.5,
        '&:hover': {
          backgroundColor: 'action.hover',
        },
      }}
    >
      <ListItemAvatar>
        <Box sx={{ position: 'relative' }}>
          <Avatar sx={{ bgcolor: 'primary.main' }}>
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
                borderColor: 'background.paper',
              }}
            />
          )}
        </Box>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              {user?.fullName}
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
        }
        secondary={
          <Typography variant="caption" color="text.secondary">
            @{user?.username}
          </Typography>
        }
      />
    </ListItem>
  )
}

export default OtherUser