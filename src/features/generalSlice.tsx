import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";



const initialState:any = {
    isDetailsShown : false,
}

export const generalSlice = createSlice({
    name:'general',
    initialState,
    reducers:{
        setIsDetailsShown:(state,action:PayloadAction<any>)=>{ 
            state.isDetailsShown = action.payload.body.data;  
        },
    }
})

export const {setIsDetailsShown} = generalSlice.actions;

export default generalSlice.reducer;