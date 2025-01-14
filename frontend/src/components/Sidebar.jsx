import React, { useState, useEffect } from 'react'
import {BiSearch} from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';

const Sidebar = () => {
    const [search,setSearch]=useState('');
    const {otherUsers}=useSelector(store=>store.user);
    const [originalOtherUsers, setOriginalOtherUsers] = useState([]);
    const dispatch= useDispatch();

    const navigate=useNavigate();

    useEffect(() => {
      if (originalOtherUsers.length === 0 && otherUsers?.length > 0) {
        setOriginalOtherUsers(otherUsers);
      }
    }, [otherUsers, originalOtherUsers]);


    const logoutHandler= async()=>{
    try{
      const res=await axios.get(`http://localhost:8080/api/v1/user/logout`);
      navigate("/login");
      toast.success(res.data.message);
      dispatch(setAuthUser(null));
    }catch(error){
      console.log(error);
    }
  };
  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (value.trim() === "") {
        // Reset to the original user list
        dispatch(setOtherUsers(originalOtherUsers));
    } else {
      // Dynamically filter the users as the search text changes
      const matchingUsers = originalOtherUsers?.filter((user) =>
        user.fullName.toLowerCase().includes(value.toLowerCase())
      );
      dispatch(setOtherUsers(matchingUsers));
    }
};
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const matchingUsers = otherUsers?.filter((user) => 
        user.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (matchingUsers?.length > 0) {
        dispatch(setOtherUsers(matchingUsers));
    } else {
        toast.error("User not found!");
    }
};
  return (
    <div className='border-r border-slate-500 p-4 flex flex-col'>
        <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
            <input 
            value={search}
            onChange={onSearchChange}
            className='input input-bordered rounded-md'
            type="text" placeholder='Search'/>
        
        <button type='submit' className='btn bg-zinc-700 text-white'>
        <BiSearch className='w-6 h-6 outline-none'/>
        </button>
        </form>
        <div className="divider px-3"></div>
        <OtherUsers/>
        <div className='mt-2'>
                <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
        </div>
    </div>
  )
}

export default Sidebar