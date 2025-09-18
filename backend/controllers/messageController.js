import {Conversation} from "../models/conversationModel.js";
import {Message} from "../models/messageModel.js";
import { getReceiverSocketIds, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        // Find or create the conversation between the sender and receiver
        let gotConversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] },
        });

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId],
            });
        }

        // Create the new message
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        });

        if (newMessage) {
            gotConversation.messages.push(newMessage._id);
        }

        // Save both the conversation and the message
        await Promise.all([gotConversation.save(), newMessage.save()]);

        // Socket IO: Find receiver's socket IDs and emit the message to all
        const receiverSocketIds = getReceiverSocketIds(receiverId);
        if (receiverSocketIds.length) {
            receiverSocketIds.forEach((sid) => io.to(sid).emit('newMessage', newMessage));
            console.log('Message sent to sockets:', receiverSocketIds, 'Message:', newMessage);
        } else {
            console.log('Receiver not connected or socket ID not found. Receiver ID:', receiverId);
        }

        // Return the new message as a response
        return res.status(201).json({
            newMessage,
        });

    } catch (error) {
        console.log('Error in sendMessage:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

export const getMessage=async(req,res)=>{
    try{
        const receiverId=req.params.id;
        const senderId=req.id;
        const conversation=await Conversation.findOne({
            participants:{$all:[senderId, receiverId]}
        }).populate("messages");
        return res.status(200).json(conversation?.messages);
    }catch(error){
        console.log(error);
    }
}