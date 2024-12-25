import mongoose from "mongoose";

const messageModel=new mongoose.schema({
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
});
export const Message=mongoose.model("Message", messageModel);