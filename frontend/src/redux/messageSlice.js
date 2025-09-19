import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:[], // initialize as array to avoid null spreads
    },
    reducers:{
        setMessages:(state,action)=>{
            state.messages = action.payload || [];
        },
        // Safe append that avoids stale closures when used in hooks
        addMessage:(state, action)=>{
            if(!state.messages) state.messages = [];
            state.messages.push(action.payload);
        }
    }
});
export const {setMessages, addMessage} = messageSlice.actions;
export default messageSlice.reducer;