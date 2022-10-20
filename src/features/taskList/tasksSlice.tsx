/*********************************************/
/* Reducer for slice of state                */
/*********************************************/

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { ITask } from "../../interfaces";

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

    successLoading: (state, action: PayloadAction<TaskListState>) => {
      console.log(action.payload);
      state.entities = {
        //TODO: change to "for" cycle with checking modification timestamp for each task
        ...state.entities,
        ...action.payload.entities,
      };
      state.ids = Array.from(new Set([...state.ids, ...action.payload.ids]));
      return state;
    },
  },
});

export const taskListReducer = tasksSlice.reducer;
export const taskListActions = {
  ...tasksSlice.actions,
};

/*********************************************/
/* Selector functions for slice state        */
/*********************************************/

export function selectTasksSlice(state: RootState) {
  return state.tasks;
}

export function selectAllTasks(state: RootState) {
  return Object.values(selectTasksSlice(state).entities);
}

export function selectAllFilteredTasks(state: RootState, filter: string) {
  const allTasks = selectAllTasks(state);
  return allTasks.filter((task) => checkSelection(filter, task.isDone));
}

/*********************************************/
/* Utilities                                 */
/*********************************************/

const getTasksWithoutDeletedTask = function (
  state: TaskListState,
  taskId: string
) {
  // Search for task object with taskId
  if (!(taskId in state.entities)) return state;
  delete state.entities[taskId];
  let index = state.ids.findIndex((item) => item === taskId);

  // Delete the task from tasks
  state.ids.splice(index, 1);
  return state;
};

/**
 *
 * @param {array} state
 * @param {string} taskId
 * @param {bool} isDoneNewValue
 * @returns {array}
 */
const getTasksWithToggledTaskIsDone = function (
  state: TaskListState,
  taskId: string,
  isDoneNewValue: boolean
) {
  // Search for task object with taskId
  if (!(taskId in state.entities)) return state;

  // Changing isDone status for the task in tasks
  state.entities[taskId].isDone = isDoneNewValue;
  return state;
};

/**
 *
 * @param {string} selectedFilter
 * @param {boolean} taskStatus
 * @returns true, if task status is matched with filter and false, if task status is not matched
 */
const checkSelection = function (selectedFilter: string, taskStatus: boolean) {
  return (
    selectedFilter === "filter-all" ||
    (selectedFilter === "filter-active" && !taskStatus) ||
    (selectedFilter === "filter-completed" && taskStatus)
  );
};

const uuidv4 = function (): string {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
