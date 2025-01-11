import React from "react";
import SendInput from "./SendInput";
import Messages from "./Messages";

const MessageContainer = () => {
  return (
      <div className='md:min-w-[550px] flex flex-col'>
        <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
          <div className="avatar online">
            <div className="w-12 rounded-full">
              <img
                src="https://images.pexels.com/photos/4902634/pexels-photo-4902634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="user-profile"
              />
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="flex justify-between gap-2 ">
              <p>Esha Raj</p>
            </div>
          </div>
        </div>
        <Messages/>
        <SendInput/>
      </div>
  );
};

export default MessageContainer;
