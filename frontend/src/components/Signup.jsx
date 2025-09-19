import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import validator from 'validator'; 
import { useEmailContext } from '../context/EmailContext.jsx'; 
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Link as MuiLink,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress
} from '@mui/material'; 

const Signup = () => {
  const [user, setUser]=useState({
    fullName:"",
    email:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:"male",
  });
  
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate=useNavigate();

    // Get the setEmail function from context
    const { setEmail } = useEmailContext();

  //handling checkbox

  const handleCheckbox= (gender)=>{
    setUser({...user,gender})
  }

  //validating email
  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  //submit handler

  const onSubmitHandler=async (e)=>{
     e.preventDefault();

     if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

     try{
      console.log(user);
        const res= await axios.post(`/api/v1/user/register`,user,{
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
        });
       if(res.data.success){
        toast.success(res.data.message);

        setEmail(user.email);
        navigate("/otpAuth");
       
       }
     }catch(error){
       toast.error(error.response?.data?.message || 'Something went wrong!');
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false once done
    }

      setUser({
        fullName:"",
        email:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:"male",
      });
      setIsEmailValid(false); // Reset validation status
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
            Signup
          </Typography>
          <Box component="form" onSubmit={onSubmitHandler}>
            <TextField
              fullWidth
              label="Full Name"
              value={user.fullName}
              onChange={(e) => setUser({...user, fullName: e.target.value})}
              margin="normal"
              variant="outlined"
              required
            />
            
            <TextField
              fullWidth
              label="Email Address"
              type="email"
              value={user.email}
              onChange={(e) => {
                setUser({ ...user, email: e.target.value });
                validateEmail(e.target.value);
              }}
              margin="normal"
              variant="outlined"
              required
              error={user.email !== '' && !isEmailValid}
              helperText={user.email !== '' && !isEmailValid ? 'Please enter a valid email' : ''}
            />

            <TextField
              fullWidth
              label="Username"
              value={user.username}
              onChange={(e) => setUser({...user, username: e.target.value})}
              margin="normal"
              variant="outlined"
              required
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({...user, password: e.target.value})}
              margin="normal"
              variant="outlined"
              required
              autoComplete="new-password"
            />

            <TextField
              fullWidth
              label="Confirm Password"
              type="password"
              value={user.confirmPassword}
              onChange={(e) => setUser({...user, confirmPassword: e.target.value})}
              margin="normal"
              variant="outlined"
              required
              autoComplete="new-password"
            />

            <FormControl component="fieldset" sx={{ mt: 2, mb: 2 }}>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                row
                value={user.gender}
                onChange={(e) => handleCheckbox(e.target.value)}
              >
                <FormControlLabel value="male" control={<Radio />} label="Male" />
                <FormControlLabel value="female" control={<Radio />} label="Female" />
                <FormControlLabel value="other" control={<Radio />} label="Other" />
              </RadioGroup>
            </FormControl>

            <Typography align="center" sx={{ my: 2 }}>
              Already have an account?{' '}
              <MuiLink component={Link} to="/login" color="primary">
                Login
              </MuiLink>
            </Typography>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{ mt: 2, py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Signup'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default Signup