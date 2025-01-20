import mongoose from "mongoose";
import validator from 'validator';


const userModel= new mongoose.Schema({
    fullName:{
        type: String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:function(v){
                return validator.isEmail(v);
            },
            message: props=> `${props.value} is not a valid email!`,
        },
    },
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    profilePhoto:{
        type:String,
        default:""
    },
    gender:{
        type:String,
        enum:["male","female"], //either of these values
        required:true,
    }
},{timestamps:true})

export const User=mongoose.model("User",userModel);