import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OTP = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
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

      const res = await axios.post('http://localhost:8080/api/v1/user/verify', { otp }, {
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


  return (
    <div className="otp-container">
      <h2>Enter OTP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={handleOtpChange}
          maxLength="6"
          placeholder="Enter 6-digit OTP"
          className="otp-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Verifying...' : 'Verify OTP'}
        </button>
      </form>
    </div>
  );
};

export default OTP;
