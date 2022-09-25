import {createSlice} from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: "filter-all",
    reducers: {
        changeCurrentFilter: (state, action) => action.payload,
    },
});

export const filterReducer = filterSlice.reducer;
export const filterSliceActions = {
    ...filterSlice.actions,
}

/*********************************************/
/* Selector functions for slice state        */
/*********************************************/

export function selectCurrentFilter(state) {
    return state.selectedFilter;
}