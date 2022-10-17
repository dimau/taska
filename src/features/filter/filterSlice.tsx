import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

let initialState = "filter-all";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCurrentFilter: (state, action: PayloadAction<string>) =>
      action.payload,
  },
});

export const filterReducer = filterSlice.reducer;
export const filterSliceActions = {
  ...filterSlice.actions,
};

/*********************************************/
/* Selector functions for slice state        */
/*********************************************/

export function selectCurrentFilter(state: RootState) {
  return state.selectedFilter;
}
