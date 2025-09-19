import React, { useState, useEffect } from 'react'
import {BiSearch} from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';
import {persistor} from '../redux/store.js'
import { 
  Box, 
  TextField, 
  Button, 
  Avatar,
  Typography,
  Divider,
  IconButton,
  Tooltip
} from '@mui/material';
import { Person, Logout } from '@mui/icons-material';

const Sidebar = () => {
    const [search,setSearch]=useState('');
    const {otherUsers, authUser}=useSelector(store=>store.user);
    const [originalOtherUsers, setOriginalOtherUsers] = useState([]);
    const dispatch= useDispatch();

    const navigate=useNavigate();

    useEffect(() => {
      if (originalOtherUsers.length === 0 && otherUsers?.length > 0) {
        setOriginalOtherUsers(otherUsers);
      }
    }, [otherUsers, originalOtherUsers]);


    const logoutHandler= async()=>{
    try{
      const res=await axios.get(`/api/v1/user/logout`,{
        withCredentials:true,
      });
      dispatch(setAuthUser(null));
      dispatch({ type: 'RESET_APP_STATE' });
      await persistor.purge(); 
      navigate("/login");
      toast.success(res.data.message);

    }catch(error){
      console.log(error);
    }
  };
  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
        // Reset to the original user list
        dispatch(setOtherUsers(originalOtherUsers));
    } else {
      // Dynamically filter the users as the search text changes
      const matchingUsers = originalOtherUsers?.filter((user) =>
        user.fullName.toLowerCase().includes(value.toLowerCase())
      );
      dispatch(setOtherUsers(matchingUsers));
    }
};
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const matchingUsers = otherUsers?.filter((user) => 
        user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (matchingUsers?.length > 0) {
        dispatch(setOtherUsers(matchingUsers));
    } else {
        toast.error("User not found!");
    }
};
  return (
    <Box sx={{ 
      borderRight: 1, 
      borderColor: 'divider', 
      p: 2, 
      display: 'flex', 
      flexDirection: 'column',
      minWidth: 300,
      backgroundColor: 'background.paper'
    }}>
      {/* Profile Section */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Avatar 
          sx={{ 
            width: 40, 
            height: 40, 
            mr: 2,
            bgcolor: 'primary.main'
          }}
        >
          <Person />
        </Avatar>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            {authUser?.fullName}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {authUser?.username}
          </Typography>
        </Box>
        <Tooltip title="Logout">
          <IconButton 
            onClick={logoutHandler}
            size="small"
            color="error"
          >
            <Logout />
          </IconButton>
        </Tooltip>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Search Section */}
      <Box component="form" onSubmit={searchSubmitHandler} sx={{ display: 'flex', gap: 1, mb: 2 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Search users..."
          value={search}
          onChange={onSearchChange}
          variant="outlined"
        />
        <Button 
          type="submit" 
          variant="contained" 
          size="small"
          sx={{ minWidth: 'auto', px: 2 }}
        >
          <BiSearch size={20} />
        </Button>
      </Box>

      <Divider sx={{ mb: 2 }} />

      {/* Users List */}
      <Box sx={{ flex: 1, overflow: 'auto' }}>
        <OtherUsers/>
      </Box>
    </Box>
  )
}

export default Sidebar