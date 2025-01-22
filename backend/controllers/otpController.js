import nodemailer from 'nodemailer';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { registrationDataStore } from './userController.js';

dotenv.config(); 

// In-memory store for OTPs (you can use a database for persistence)
let otpStore = {};

// Configure nodemailer transport (using Gmail in this example)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER, // Replace with your email
      pass: process.env.GMAIL_APP_PASSWORD// Replace with your email password or App password
    }
  });


  // Utility function to generate OTP and send it to the user's email
    const sendOTP = (email) => {
    const otp = crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
    const expirationTime = 5 * 60 * 1000; // 5 minutes in milliseconds
    const timestamp = Date.now(); // Current timestamp
     otpStore[email] = { otp, timestamp, expirationTime }; // Store OTP temporarily (this can be replaced with a DB or cache like Redis)

    // Mail options
    const mailOptions = {
        from: process.env.GMAIL_USER,  // Use the email from .env file
        to: email,
        subject: 'Your OTP for Email Verification',
        text: `Your OTP is: ${otp}`
    };
      // Send OTP email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending OTP email:', error);
        } else {
            console.log('OTP sent:', info.response);
        }
    });
    return { success: true, message: 'OTP sent successfully' };
};

const isOTPExpired = (email) => {
    const otpData = otpStore[email];
    if (!otpData) {
        return true; // OTP not found
    }

    const currentTime = Date.now();
    const isExpired = currentTime - otpData.timestamp > otpData.expirationTime; // Check expiration time
    return isExpired;
};

export { sendOTP, isOTPExpired, otpStore };


