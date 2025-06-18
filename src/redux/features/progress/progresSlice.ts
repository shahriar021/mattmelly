import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pgBar:0.4,
  ID:null
};

const progresSlice=createSlice({
  name:"progress",
  initialState,
  reducers:{
    setPgBar:(state,action)=>{
        if(state.pgBar!==1){
            state.pgBar+=action.payload
        }
    },
    setResetPgbar:(state)=>{
      state.pgBar=0.4
    },
    setID:(state,action)=>{
      state.ID=action.payload
    }
  }
})

export const { setPgBar,setID,setResetPgbar } =
  progresSlice.actions;
export default progresSlice.reducer;