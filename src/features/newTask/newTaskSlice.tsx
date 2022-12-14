import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

const initialState = "";

const newTaskSlice = createSlice({
  name: "newTask",
  initialState,
  reducers: {
    changeNewTaskValue: (state, action: PayloadAction<string>) =>
      action.payload,
  },
});

export const newTaskReducer = newTaskSlice.reducer;
export const newTaskActions = {
  ...newTaskSlice.actions,
};

/*********************************************/
/* Selector functions for slice state        */
/*********************************************/

export function selectNewTask(state: RootState) {
  return state.newTask;
}
