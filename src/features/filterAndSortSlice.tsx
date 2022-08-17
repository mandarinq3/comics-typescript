import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

export interface appState{
    libraryToRender:Array<any>;
}

const initialState: appState = {
    libraryToRender:[],
}

export const filterAndSortSlice = createSlice({
    name:'filterAndSort',
    initialState,
    reducers:{
        setLibraryToRender:(state,action:PayloadAction<any>)=>{ 
                state.libraryToRender=action.payload.body.data;   
        },
    }
})

export const {setLibraryToRender} = filterAndSortSlice.actions;

export default filterAndSortSlice.reducer;