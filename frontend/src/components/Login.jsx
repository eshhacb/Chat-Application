import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Link as MuiLink 
} from '@mui/material';

const Login = () => {
  const [user, setUser]=useState({
      username:"",
      password:"",
    });
    const dispatch=useDispatch();
    const navigate=useNavigate();
  
    const onSubmitHandler=async(e)=>{
        e.preventDefault();
        try{
          console.log(user);
            const res= await axios.post(`/api/v1/user/login`,user,{
              headers:{
                'Content-Type':'application/json'
              },
              withCredentials:true
            });
            if (res.data.success) {
              toast.success(res.data.message);
              navigate("/home");
              console.log(res);
              dispatch(setAuthUser(res.data));
             
            }
            console.log(res.data);
           
         }catch(error){
            toast.error(error.response.data.message);
            console.log(error);
         }
        setUser({
          username:"",
          password:"",
        })
    }
  return (
    <Box sx={{ minWidth: 400, mx: 'auto' }}>
      <Card sx={{ 
        p: 3, 
        borderRadius: 2, 
        boxShadow: 3,
        backgroundColor: 'background.paper'
      }}>
        <CardContent>
          <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 3 }}>
            Login
          </Typography>
          <Box component="form" onSubmit={onSubmitHandler}>
            <TextField
              fullWidth
              label="Username"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              margin="normal"
              variant="outlined"
              required
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              margin="normal"
              variant="outlined"
              required
              autoComplete="current-password"
            />
            <Typography align="center" sx={{ my: 2 }}>
              Don't have an account?{' '}
              <MuiLink component={Link} to="/signup" color="primary">
                Sign up
              </MuiLink>
            </Typography>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, py: 1.5 }}
            >
              Login
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Login