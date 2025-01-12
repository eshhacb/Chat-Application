import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';


const Message = ({message}) => {
  const scroll=useRef();
  const {authUser,selectedUser}=useSelector(store=>store.user);
  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior:'smooth'});
  },[message]);

  return (
    <div ref={scroll} className={`chat ${message?.senderId==authUser?._id ? 'chat-end':'chat-start'}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                 <img
                    alt="pfp"
                    src={message?.senderId === authUser?._id ? authUser?.profilePhoto  : selectedUser?.profilePhoto} />
    </div>
  </div>
  <div className="chat-bubble bg-gray-700 text-white p-3 rounded-lg relative">
  <span className=''>{message?.message}</span>
  <time className="text-xs opacity-50 self-end ml-2">12:45</time>
      </div>
    </div>
  )
}

export default Message