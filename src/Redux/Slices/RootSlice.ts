import { createSlice } from "@reduxjs/toolkit";

const rootSlice = createSlice({
    name: "root",
    initialState: {
        name: "Name",
        model: "Model",
        car_quality: "Car Quality",
        price: "Price",
        year:"Year",
        description:"Description"
    },
    reducers:{
        chooseName: (state, action) => { state.name = action.payload},
        chooseModel: (state, action) => { state.model = action.payload},
        chooseCar: (state, action) => { state.car_quality = action.payload},
        choosePrice: (state, action) => { state.price = action.payload},
        chooseYear: (state, action) => { state.year = action.payload},
        chooseDescription: (state, action) => { state.description = action.payload},
    }
})

export const  reducer = rootSlice.reducer;
export const { chooseName, chooseModel, chooseCar, choosePrice, chooseYear, chooseDescription } = rootSlice.actions;