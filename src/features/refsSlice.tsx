import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";



const initialState:any = {
    refs : {},
}

export const refsSlice = createSlice({
    name:'refs',
    initialState,
    reducers:{
        setRef:(state,action:PayloadAction<any>)=>{ 
            state.refs[action.payload.body.data.name] = action.payload.body.data.ref;  
        },
    }
})

export const {setRef} = refsSlice.actions;

export default refsSlice.reducer;