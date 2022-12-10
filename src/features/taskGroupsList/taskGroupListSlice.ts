import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

let initialState = "";

const TaskGroupListSlice = createSlice({
  name: "selectedTaskGroup",
  initialState,
  reducers: {
    changeActiveGroup: (state, action) => {
      return action.payload;
    },
  },
});

export const taskGroupListReducer = TaskGroupListSlice.reducer;
export const taskGroupListActions = TaskGroupListSlice.actions;

export function selectActiveTaskGroupId(state: RootState) {
  return state.selectedTaskGroup;
}
