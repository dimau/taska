import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

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
