import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEmailContext } from '../context/EmailContext.jsx'; 
import { 
  Box, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Typography, 
  Alert,
  CircularProgress
} from '@mui/material'; 

const OTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const navigate = useNavigate();

  const handleOtpChange = (e) => {
     // Restrict OTP to only numbers
     const value = e.target.value;
     if (/^\d*$/.test(value)) {
       setOtp(value);
     }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('OTP length:', otp.length);
    console.log('Entered OTP:', otp);

    if (otp.length !== 6) {
      setError('OTP must be 6 digits');
      return;
    }

    setError(''); // Clear any previous errors
    setLoading(true);

    try {
      console.log('Sending OTP to server...');

      const res = await axios.post('/api/v1/user/verify', { otp }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('Response from server:', res.data);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");  // Redirect to login page after OTP verification
      } else {
        setError(res.data.message || 'Verification failed');
        console.log('Verification failed:', res.data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error during OTP verification:', error);
    } finally {
      setLoading(false);
      console.log('Loading state:', loading);
    }
  };

  // Get email from context
  const { email } = useEmailContext();

  useEffect(() => {
    if (!email) {
      navigate("/signup"); // Redirect to signup if email is not available in context
    }
  }, [email, navigate]);

  const handleResendOtp = async () => {
    setResendLoading(true); // Set resend loading state to true
    try {
      const res = await axios.post('/api/v1/user/resendOTP', { email }, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || 'Failed to resend OTP');
      }
    } catch (error) {
      toast.error('An error occurred while resending OTP');
    } finally {
      setResendLoading(false);
    }
  };


  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'background.default'
    }}>
      <Card sx={{ 
        p: 4, 
        borderRadius: 2, 
        boxShadow: 3,
        backgroundColor: 'background.paper',
        minWidth: 400
      }}>
        <CardContent>
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            OTP Verification
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 3 }}>
            Enter the 6-digit OTP sent to your email
          </Typography>
          
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Enter OTP"
              value={otp}
              onChange={handleOtpChange}
              inputProps={{ maxLength: 6 }}
              margin="normal"
              variant="outlined"
              required
              error={!!error}
              helperText={error}
            />
            
            {error && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            )}
            
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                variant="outlined"
                onClick={handleResendOtp}
                disabled={resendLoading}
                sx={{ flex: 1 }}
              >
                {resendLoading ? <CircularProgress size={20} /> : 'Resend OTP'}
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ flex: 1 }}
              >
                {loading ? <CircularProgress size={20} /> : 'Verify OTP'}
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};
export default OTP;