import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { apiSlice } from "../api/apiSlice";

const initialState = {
  activeTaskId: "",
};

const TaskListSlice = createSlice({
  name: "taskList",
  initialState,
  reducers: {
    changeActiveTask: (
      state,
      action: PayloadAction<{
        activeTaskId: string;
      }>
    ) => {
      state.activeTaskId = action.payload.activeTaskId;
    },
    clearActiveTask: (state) => {
      state.activeTaskId = "";
    },
  },
});

export const taskListReducer = TaskListSlice.reducer;
export const taskListActions = TaskListSlice.actions;

export function selectTaskListSlice(state: RootState) {
  return state.taskList;
}

export function selectActiveTaskId(state: RootState) {
  return selectTaskListSlice(state).activeTaskId;
}

export const selectTasksByTaskListIdResult = (taskListId: string) =>
  apiSlice.endpoints.getTasksByTaskListId.select({ taskListId });

export const selectAllTasksByTaskListId = (taskListId: string) =>
  createSelector(
    selectTasksByTaskListIdResult(taskListId),
    (result) => result?.data ?? []
  );
