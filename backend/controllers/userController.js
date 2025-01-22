import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { sendOTP, isOTPExpired, otpStore } from "./otpController.js";

//handling the registration of a new user
let registrationDataStore = {};

export const register=async(req,res)=>{
    try{
        const {fullName, email, username, password, confirmPassword, gender} = req.body;
        //submitted when user submits the form

        if(!fullName || !email || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"password do not match"});
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already in use, please use another one!" });
        }

        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({message:"Username already exists, try another username!"})
        }

          // Save user data temporarily
        registrationDataStore[email] = {
            fullName,
            email,
            username,
            password,
            gender,
        };
  
      // Send OTP to the user's email
      sendOTP(email);
  
      return res.status(200).json({
        message: "OTP has been sent to your email. Please verify to complete registration.",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error. Please try again." });
    }
};

// Step 2: Verify OTP and Complete Registration
export const verify = async (req, res) => {
    try {
      const {otp } = req.body;
  
      if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
      }


    // Find the email associated with the OTP
    const email = Object.keys(otpStore).find((key) => otpStore[key]?.otp === otp);

    if (!email) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

  
      // Check if OTP is expired or incorrect
      if (isOTPExpired(email)) {
        return res.status(400).json({ message: "OTP has expired. Please request a new one." });
      }
  
      // Retrieve user data from the temporary store
      const userData = registrationDataStore[email];
      if (!userData) {
        return res.status(400).json({ message: "User data not found. Please try again." });
      }
  
      const { fullName, username, password, gender } = userData;
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Generate profile photo based on gender
      const maleProfilePhoto = `https://avatar.iran.liara.run/public/boy?username=${username}`;
      const femaleProfilePhoto = `https://avatar.iran.liara.run/public/girl?username=${username}`;
  
      // Save the user permanently in the database
      await User.create({
        fullName,
        email,
        username,
        password: hashedPassword,
        profilePhoto: gender === "male" ? maleProfilePhoto : femaleProfilePhoto,
        gender,
      });
  
      // Clear temporary store and OTP store
      delete registrationDataStore[email];
      delete otpStore[email];
  
      return res.status(201).json({
        message: "Account created successfully!",
        success: true,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Server error. Please try again." });
    }
  };
export const login= async(req,res)=>{
    try{
        const {username, password} = req.body;
        if(!username || !password){
            return res.status(400).json({message:"All fields are required"});
        };
        const user= await User.findOne({username});
        if(!user){
            return res.status(400).json({
                message:"Incorrect username or password",
                success:false
            })
        };
        const isPasswordMatch= await bcrypt.compare(password,user.password);
        if(!isPasswordMatch){
            return res.status(400).json({
                message:"Incorrect username or password",
                success:false
            })
        };
        const tokenData={
            userId:user._id //id is like primary key generated for each user
        };
        const token= await jwt.sign(tokenData,process.env.JWT_SECRET_KEY,{expiresIn:'1d'});

        return res.status(200).cookie("token",token, {maxAge:1*24*60*60*1000, 
        httpOnly:true, sameSite:'strict'})
        .json({
            success: true, // Added this field
            message: "Login successful", // Added for consistency
            _id:user._id,
            username:user.username,
            fullName:user.fullName,
            profilePhoto:user.profilePhoto
        });

    }catch(error){
        console.error(error);
        return res.status(500).json({ message: "An internal server error occurred." });
    }
}

export const logout=(req,res)=>{
        try {
            // Set headers to prevent caching on the client-side
            res.setHeader('Cache-Control', 'no-store'); // Prevent caching of sensitive data
            res.setHeader('Pragma', 'no-cache'); // For older HTTP/1.0 caches
            res.setHeader('Expires', '0'); // Set expiry time to 0 for older browsers
        
            // Clear the "token" cookie
            return res
              .status(200)
              .cookie("token", "", { maxAge: 0, httpOnly: true, secure: true })
              .json({
                message: "Logged out successfully!",
              });
          } catch (error) {
            console.log(error);
            return res.status(500).json({ message: "An internal server error occurred." });
          }
}

export const getOtherUsers=async(req,res)=>{
    try{
        const loggedInUserId=req.id;
        const otherUsers= await User.find({_id:{$ne:loggedInUserId}}).select("-password");
        return res.status(200).json(otherUsers);
    }catch(error){
        console.log(error);
    }
}

export { registrationDataStore };