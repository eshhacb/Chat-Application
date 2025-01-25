import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useEmailContext } from '../context/EmailContext.jsx'; 

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
      const res = await axios.post('http://localhost:8080/api/v1/user/resendOTP', { email }, {
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
    <div className=" w-screen flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-teal-400">
      <div className="bg-white rounded-lg shadow-lg p-8 w-96">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          OTP Verification
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter the 6-digit OTP sent to your email
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={handleOtpChange}
            maxLength="6"
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
          />
          {error && (
            <p className="text-sm text-red-500 font-medium text-center">
              {error}
            </p>
          )}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleResendOtp}
              className={`py-2 px-4 text-white font-semibold rounded-lg ${resendLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              disabled={resendLoading} // Disable when loading
            >
              {resendLoading ? 'Resending...' : 'Resend OTP'}
            </button>
            <button
              type="submit"
              className={`py-2 px-4 rounded-lg text-white font-semibold ${loading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default OTP;