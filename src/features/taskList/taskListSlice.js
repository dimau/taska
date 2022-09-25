/*********************************************/
/* Reducer for slice of state                */
/*********************************************/

import { createSlice } from "@reduxjs/toolkit";

const initialTasks = [
  {
    taskId: "1",
    title: "Купить бэху и гонять на ней как фрайер по Кипру",
    isDone: false,
  },
  { taskId: "2", title: "Свалить из Рашки в Армяшку", isDone: false },
  { taskId: "3", title: "Сделано уже нах", isDone: true },
];

export const taskListSlice = createSlice({
  name: "tasks",
  initialState: initialTasks,
  reducers: {
    addNewTask: (state, action) => {
      if (action.payload === "") return state;
      state.push({
        taskId: uuidv4(),
        title: action.payload,
        isDone: false,
      });
    },
    deleteTask: (state, action) => {
      getTasksWithoutDeletedTask(state, action.payload);
    },
    toggleTaskIsDone: (state, action) => {
      getTasksWithToggledTaskIsDone(
        state,
        action.payload.taskId,
        action.payload.isDoneNewValue
      );
    },
  },
});

export const taskListReducer = taskListSlice.reducer;
export const taskListActions = {
  ...taskListSlice.actions,
};

/*********************************************/
/* Selector functions for slice state        */
/*********************************************/

export function selectAllTasks(state) {
  return state.tasks;
}

export function selectAllFilteredTasks(state, filter) {
  const allTasks = selectAllTasks(state);
  return allTasks.filter((task) => checkSelection(filter, task.isDone));
}

/*********************************************/
/* Utilities                                 */
/*********************************************/

const getTasksWithoutDeletedTask = function (tasks, taskId) {
  // Search for task object with taskId
  let index = tasks.findIndex((item) => item.taskId === taskId);
  if (index === undefined) return tasks;

  // Delete the task from tasks
  tasks.splice(index, 1);
  return tasks;
};

/**
 *
 * @param {array} tasks
 * @param {string} taskId
 * @param {bool} isDoneNewValue
 * @returns {array}
 */
const getTasksWithToggledTaskIsDone = function (tasks, taskId, isDoneNewValue) {
  let index = tasks.findIndex((item) => item.taskId === taskId);
  if (index === undefined) return tasks;

  // Changing isDone status for the task in tasks
  tasks[index].isDone = isDoneNewValue;
  return tasks;
};

/**
 *
 * @param {string} selectedFilter
 * @param {boolean} taskStatus
 * @returns true, if task status is matched with filter and false, if task status is not matched
 */
const checkSelection = function (selectedFilter, taskStatus) {
  return (
    selectedFilter === "filter-all" ||
    (selectedFilter === "filter-active" && taskStatus === false) ||
    (selectedFilter === "filter-completed" && taskStatus === true)
  );
};

const uuidv4 = function () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
