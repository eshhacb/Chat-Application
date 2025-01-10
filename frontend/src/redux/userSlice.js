import {createSlice} from '@reduxjs/toolkit';

const userSlice=createSlice({
    name:"user",
    initialState:{
        authUser:null,
    },
    reducers:{
        setAuthUser:(state,action)=>{
            console.log("Payload received:", action.payload);
            state.authUser=action.payload;
        }
    }
});
export const {setAuthUser}=userSlice.actions;
export default userSlice.reducer;