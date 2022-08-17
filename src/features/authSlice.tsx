import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {

        token: null | string,
        user:  null | string, 

}

const initialState:IAuthState = {
    token : null,
    user: null,
}

export const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserAndToken:(state,action:PayloadAction<any>)=>{             
            state.user = action.payload.body.data.user; 
            state.token = action.payload.body.data.token;  
        },
    }
})

export const {setUserAndToken} = authSlice.actions;

export default authSlice.reducer;