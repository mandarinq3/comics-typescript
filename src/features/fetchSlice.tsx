import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

type defaultSortType = {
    state:boolean,
    both:boolean,
}

export interface appState{
    libraryFull:Array<any>;
    libraryToRender:Array<any>;
    isLoading:boolean;
    isLoadingDone:boolean;
    errorMsg:null|string;
}

const initialState: appState = {
    libraryFull:[],
    libraryToRender:[],
    isLoading:false,
    isLoadingDone:false,
    errorMsg:null,



}

export const appSlice = createSlice({
    name:'app',
    initialState,
    reducers:{
        getFullLibrary:(state)=>{
            state.isLoading=true;
            console.log('state.isLoading=true;');     
        },
        getFullLibrary_success:(state,action:PayloadAction<any>)=>{
            state.libraryFull=action.payload;
            state.isLoadingDone=true;
            state.isLoading=false;
            console.log('state.libraryFull=action.payload---state.isLoadingDone=true---state.isLoading=false;',action.payload);
        },
        getFullLibrary_error:(state,action:PayloadAction<string | null>)=>{
            state.errorMsg=action.payload;
            state.isLoading=false;
            console.log('state.errorMsg=action.payload---state.isLoading=false;');
        },
        
    }
})

export const {getFullLibrary,getFullLibrary_success,getFullLibrary_error} = appSlice.actions;

export default appSlice.reducer