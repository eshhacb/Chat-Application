import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    authUser: null,
    otherUsers: null,
    selectedUser: null,
    onlineUsers: null,
};

const userSlice=createSlice({
    name:"user",
    initialState,
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
        },
        setOnlineUsers:(state,action)=>{
            state.onlineUsers = action.payload;
        },
        logoutUser: (state) => {
            // Reset state to initial values on logout
            Object.assign(state, initialState);
        },
    }
});
export const {setAuthUser,setOtherUsers,setSelectedUser,setOnlineUsers,logoutUser,}=userSlice.actions;
export default userSlice.reducer;