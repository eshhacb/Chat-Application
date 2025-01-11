import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
        otherUsers:null,
        selectedUser:null,
    },
    reducers:{
        setAuthUser:(state,action)=>{
            console.log("Payload received:", action.payload);
            state.authUser=action.payload;
        },
        setOtherUsers:(state,action)=>{
            state.otherUsers=action.payload;
        },
        setSelectedUser:(state,action)=>{
            state.selectedUser=action.payload;
        }
    }
});
export const {setAuthUser,setOtherUsers,setSelectedUser}=userSlice.actions;
export default userSlice.reducer;