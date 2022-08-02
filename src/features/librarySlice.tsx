import { createSlice } from "@reduxjs/toolkit";

export interface appState{
    libraryFull:Array<any>;
    libraryToRender:Array<any>;
}

const initialState: appState = {
    libraryFull:[],
    libraryToRender:[],
}

export const librarySlice = createSlice({
    name:'library',
    initialState,
    reducers:{
        setLibraryToRender:(state,action)=>{
            console.log(action);
        },
    }
})

export const {setLibraryToRender} = librarySlice.actions;

export default librarySlice.reducer