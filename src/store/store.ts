import { configureStore } from "@reduxjs/toolkit";
import { initFullLibraryMW } from "../midwares/initFullLibraryMW";
import {filterAndSortMW} from '../midwares/filterAndSortMW';
import fetchReducer from '../features/fetchSlice';
import filterAndSortReducer from '../features/filterAndSortSlice';
import refsSlice from "../features/refsSlice";
import generalSlice from "../features/generalSlice";
import authSlice from "../features/authSlice";



export const store = configureStore({
    reducer:{
        fetch:fetchReducer,
        filterAndSort:filterAndSortReducer,
        refs:refsSlice,
        general:generalSlice,
        auth:authSlice,
    },
    middleware:[initFullLibraryMW,filterAndSortMW],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;