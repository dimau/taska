/*********************************************/
/* Reducer for slice of state                */
/*********************************************/

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITask } from "../../interfaces";
import {
  getTasksWithoutDeletedTask,
  getTasksWithToggledTaskIsDone,
  uuidv4,
} from "./utils";

export interface TaskListStateEntities {
  [id: string]: ITask;
}

export interface TaskListState {
  entities: TaskListStateEntities;
  ids: string[];
}

const initialState: TaskListState = {
  entities: {},
  ids: [],
};

export const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<{ title: string }>) => {
      if (action.payload.title === "") return state;
      let taskId = uuidv4();
      state.entities[taskId] = {
        taskId: taskId,
        title: action.payload.title,
        isDone: false,
      };
      state.ids.push(taskId);
    },

    deleteTask: (state, action: PayloadAction<{ taskId: string }>) => {
      return getTasksWithoutDeletedTask(state, action.payload.taskId);
    },

    toggleTaskIsDone: (
      state,
      action: PayloadAction<{ taskId: string; isDoneNewValue: boolean }>
    ) => {
      return getTasksWithToggledTaskIsDone(
        state,
        action.payload.taskId,
        action.payload.isDoneNewValue
      );
    },

    // successLoading: (state, action: PayloadAction<TaskListState>) => {
    //   console.log(action.payload);
    //   state.entities = {
    //     //TODO: change to "for" cycle with checking modification timestamp for each task
    //     ...state.entities,
    //     ...action.payload.entities,
    //   };
    //   state.ids = Array.from(new Set([...state.ids, ...action.payload.ids]));
    //   return state;
    // },
  },
});

export const taskListReducer = tasksSlice.reducer;
export const taskListActions = {
  ...tasksSlice.actions,
};
