import { createSlice } from "@reduxjs/toolkit";


const initialState ={
    vehicleType:null,
    carTypesST:[],
    budgetST:null,
    leasOrbuyST:null,
    newOrPreST:null,
    tradeINST:null,
    colorsST:null,
    forWhomBuyST:null,
    totalPsngrST:null,
    TotalMilesST:null
}

const questionSlice =createSlice({
    name:"question",
    initialState,
    reducers:{
        setVehicleTypesST:(state,action)=>{
            state.vehicleType=action.payload
        },
        setCarTypesST:(state,action)=>{
            state.carTypesST=action.payload
        },
        setBudgetST:(state,action)=>{
             state.budgetST=action.payload
        },
        setLeasOrbuyST:(state,action)=>{
            state.leasOrbuyST=action.payload
        },
        setNewOrPreST:(state,action)=>{
             state.newOrPreST=action.payload
        },
        setRadeINST:(state,action)=>{
            state.tradeINST=action.payload
        },
        setColorsST:(state,action)=>{
             state.colorsST=action.payload
        },
        setForWhomBuyST:(state,action)=>{
            state.forWhomBuyST=action.payload
        },
        setTotalPsngrST:(state,action)=>{
             state.totalPsngrST=action.payload
        },
        setTotalMilesST:(state,action)=>{
            state.TotalMilesST=action.payload
        }
    }
})

export const {setVehicleTypesST,setCarTypesST,setBudgetST,setLeasOrbuyST,setNewOrPreST,setRadeINST,setColorsST,setForWhomBuyST,setTotalPsngrST,setTotalMilesST}=questionSlice.actions
export default questionSlice.reducer