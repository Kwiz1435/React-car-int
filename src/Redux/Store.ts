import { configureStore } from "@reduxjs/toolkit";
import { reducer } from './Slices/RootSlice';

export const store = configureStore({
    reducer,
    devTools: true
})