import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//handling the registration of a new user

export const register=async(req,res)=>{
    try{
        const {fullName, username, password, confirmPassword, gender} = req.body;
        //submitted when user submits the form

        if(!fullName || !username || !password || !confirmPassword || !gender){
            return res.status(400).json({message:"All fields are required"});
        }
        if(password !== confirmPassword){
            return res.status(400).json({message:"password do not match"});
        }

        const user=await User.findOne({username});
        if(user){
            return res.status(400).json({message:"Username already exists, try another username!"})
        }

        //password hashing
        const hashedPassword= await bcrypt.hash(password,10);

        //profile photo
        const maleProfilePhoto= `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const femaleProfilePhoto=`https://avatar.iran.liara.run/public/girl?username=${username}`;
        

        //inserts a new document into the users collection in the db with specified fields
        await User.create({
            fullName,
            username,
            password: hashedPassword,
            profilePhoto: gender==="male"?maleProfilePhoto:femaleProfilePhoto,
            gender,
        });
        return res.status(201).json({
            message:"Account created successfully!", success:true
        });
    }catch(error){
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
    try{
        return res.status(200).cookie("token","",{maxAge:0}).json({
            message:"logged out successfully!"
        })
    }catch (error){
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