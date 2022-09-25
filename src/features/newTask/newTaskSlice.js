import { createSlice } from "@reduxjs/toolkit";
import { taskListActions } from "../taskList/taskListSlice";

const newTaskSlice = createSlice({
  name: "newTask",
  initialState: "",
  reducers: {
    changeNewTaskValue: (state, action) => action.payload,
  },
  extraReducers: (builder) => {
    builder.addCase(taskListActions.addNewTask.type, () => "");
  },
});

export const newTaskReducer = newTaskSlice.reducer;
export const newTaskActions = {
  ...newTaskSlice.actions,
};

/*********************************************/
/* Selector functions for slice state        */
/*********************************************/

export function selectNewTask(state) {
  return state.newTask;
}
