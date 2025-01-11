import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUsers:null,
    },
    reducers:{
        setAuthUser:(state,action)=>{
            console.log("Payload received:", action.payload);
            state.authUser=action.payload;
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers=action.payload;
        }
    }
});
export const {setAuthUser,setOtherUsers}=userSlice.actions;
export default userSlice.reducer;