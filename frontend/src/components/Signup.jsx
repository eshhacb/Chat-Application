import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import validator from 'validator'; 
import { useEmailContext } from '../context/EmailContext.jsx'; 

const Signup = () => {
  const [user, setUser]=useState({
    fullName:"",
    email:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:"male",
  });
  
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const navigate=useNavigate();

    // Get the setEmail function from context
    const { setEmail } = useEmailContext();

  //handling checkbox

  const handleCheckbox= (gender)=>{
    setUser({...user,gender})
  }

  //validating email
  const validateEmail = (email) => {
    if (validator.isEmail(email)) {
      setIsEmailValid(true);
    } else {
      setIsEmailValid(false);
    }
  };

  //submit handler

  const onSubmitHandler=async (e)=>{
     e.preventDefault();

     if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

     try{
      console.log(user);
        const res= await axios.post(`http://localhost:8080/api/v1/user/register`,user,{
          headers:{
            'Content-Type':'application/json'
          },
          withCredentials:true
        });
       if(res.data.success){
        toast.success(res.data.message);

        setEmail(user.email);
        navigate("/otpAuth");
       
       }
     }catch(error){
       toast.error(error.response?.data?.message || 'Something went wrong!');
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false once done
    }

      setUser({
        fullName:"",
        email:"",
        username:"",
        password:"",
        confirmPassword:"",
        gender:"male",
      });
      setIsEmailValid(false); // Reset validation status
  } 
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
      <h1 className="text-3xl font-bold text-center ">Signup</h1>
      <form onSubmit={onSubmitHandler} action="">
        <div>
          <label className="label p-2">
            <span className='text-base label-text '>Full Name</span>
          </label>
          <input 
          value={user.fullName}
          onChange={(e)=>setUser({...user,fullName:e.target.value})}
          className='w-full input input-bordered h-10' type="text" placeholder="Full Name" />
        </div>
        
       {/* //adding the email  */}
        <div className="relative">
          <label className="label p-2">
            <span className='text-base label-text '>Email Address</span>
          </label>
          <input 
          value={user.email}
          onChange={(e) => {
            setUser({ ...user, email: e.target.value });
            validateEmail(e.target.value); // Validate email on change
          }}
          className={`w-full input input-bordered h-10 ${
            isEmailValid ? "border-green-500" : "border-red-500"
        }`}
          type="email"
          placeholder="Email-Id"
        />
        </div>

        <div>
          <label className="label p-2">
            <span className='text-base label-text '>Username</span>
          </label>
          <input 
          value={user.username}
          onChange={(e)=>setUser({...user,username:e.target.value})}
          className='w-full input input-bordered h-10' type="text" placeholder="Username" />
        </div>
        <div>
          <label className="label p-2">
            <span className='text-base label-text '>Password</span>
          </label>
          <input 
          value={user.password}
          onChange={(e)=>setUser({...user,password:e.target.value})}
          className='w-full input input-bordered h-10' type="password" placeholder="Password" />
        </div>
        <div>
          <label className="label p-2">
            <span className='text-base label-text '>Confirm Password</span>
          </label>
          <input 
          value={user.confirmPassword}
          onChange={(e)=>setUser({...user,confirmPassword:e.target.value})}
          className='w-full input input-bordered h-10' type="password" placeholder="Confirm Password" />
        </div>

        <div className='flex justify-center items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input
                type="radio"
                checked={user.gender==='male'}
                onChange={()=>handleCheckbox('male')}
                name='gender'
                className="checkbox mx-2" />
            </div>
            <div className='flex items-center'>
              <p>Female</p>
              <input
                type="radio"
                checked={user.gender==='female'}
                onChange={()=>handleCheckbox('female')}
                name='gender'
                className="checkbox mx-2" />
            </div>
            <div className='flex items-center'>
              <p>Other</p>
              <input
                type="radio"
                checked={user.gender==='other'}
                onChange={()=>handleCheckbox('other')}
                name='gender'
                className="checkbox mx-2" />
            </div>
        </div>
        <p className='text-center my-2'>Already have an account? <Link to="/login" className="text-blue-600 underline"> login </Link></p>
          <div>
            <button type='submit' className='btn btn-block btn-sm mt-2 border border-slate-700'>Signup</button>
          </div>
      </form>
      </div>
    </div>
  )
}

export default Signup