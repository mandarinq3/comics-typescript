import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";



export interface appState{
    libraryFull:Array<any>;
    isLoading:boolean;
    isLoadingDone:boolean;
    errorMsg:null|string;
}

const initialState: appState = {
    libraryFull:[],
    isLoading:false,
    isLoadingDone:false,
    errorMsg:null,   
}

export const appSlice = createSlice({
    name:'fetch',
    initialState,
    reducers:{
        getFullLibrary:(state,action:PayloadAction<any>)=>{
            state.isLoading=true;               
        },
        getFullLibrary_success:(state,action:PayloadAction<any>)=>{                  
            state.libraryFull=action.payload.body.data;
            state.isLoadingDone=true;//после того как done появляеться сайдбар
            state.isLoading=false;
        },
        getFullLibrary_error:(state,action:PayloadAction<any>)=>{
            state.errorMsg=action.payload.body.data;
            state.isLoading=false;
        }, 
    }
})

export const {getFullLibrary,getFullLibrary_success,getFullLibrary_error} = appSlice.actions;

export default appSlice.reducer