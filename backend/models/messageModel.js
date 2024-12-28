//This represents the individual message
import mongoose from "mongoose";

const messageModel=new mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId, //means this field is storing unique identifier
        ref:"User",
        required:true,
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId, //means this field is storing unique identifier
        ref:"User",
        required:true,
    },
    message:{
        type:String,
        required:true
    }
},{timestamp:true});
export const Message=mongoose.model("Message", messageModel);