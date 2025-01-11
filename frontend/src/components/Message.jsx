import React from 'react'

const Message = () => {
  return (
    <div className="chat chat-start">
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                 <img
                    alt="pfp"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
    </div>
  </div>
  <div className="chat-bubble bg-gray-700 text-white p-3 rounded-lg relative">
  <span className=''>You were the Chosen One!</span>
  <time className="text-xs opacity-50 self-end ml-2">12:45</time>
      </div>
    </div>
  )
}

export default Message