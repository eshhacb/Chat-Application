import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { addMessage } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
    const {socket} = useSelector(store=>store.socket);
    const {selectedUser, authUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(!socket) return;
        const handler = (newMessage)=>{
            // Only append if this message belongs to the open conversation
            const isForOpenChat =
                (newMessage.senderId === selectedUser?._id && newMessage.receiverId === authUser?._id) ||
                (newMessage.receiverId === selectedUser?._id && newMessage.senderId === authUser?._id);
            if(isForOpenChat){
                dispatch(addMessage(newMessage));
            }
        };
        socket.on("newMessage", handler);
        return () => socket.off("newMessage", handler);
    },[socket, selectedUser?._id, authUser?._id, dispatch]);
};
export default useGetRealTimeMessage;