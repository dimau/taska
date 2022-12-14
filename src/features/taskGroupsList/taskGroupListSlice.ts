import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

let initialState = {
  activeTaskGroupListId: "",
  activeTaskGroupListTitle: "",
};

const TaskGroupListSlice = createSlice({
  name: "selectedTaskGroup",
  initialState,
  reducers: {
    changeActiveGroup: (
      state,
      action: PayloadAction<{
        activeTaskGroupListId: string;
        activeTaskGroupListTitle: string;
      }>
    ) => {
      state.activeTaskGroupListId = action.payload.activeTaskGroupListId;
      state.activeTaskGroupListTitle = action.payload.activeTaskGroupListTitle;
    },
  },
});

export const taskGroupListReducer = TaskGroupListSlice.reducer;
export const taskGroupListActions = TaskGroupListSlice.actions;

export function selectGroupListSlice(state: RootState) {
  return state.selectedTaskGroup;
}

export function selectActiveTaskGroupId(state: RootState) {
  return selectGroupListSlice(state).activeTaskGroupListId;
}

export function selectActiveTaskGroupTitle(state: RootState) {
  return selectGroupListSlice(state).activeTaskGroupListTitle;
}
