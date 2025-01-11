import React from 'react'
import { IoSend } from "react-icons/io5";

const SendInput = () => {
  return (
   <form action="" className='px-4 my-3'>
        <div className='w-full relative'>
            <input
                    type="text"
                    placeholder='Message'
                    className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-500 text-white'
             />
            <button 
               type="submit"         className='absolute flex inset-y-0 end-0 items-center pr-4'>
                    <IoSend />
            </button>
        </div>
   </form>
  )
}

export default SendInput