import { TaskListState } from "./tasksSlice";

export const getTasksWithoutDeletedTask = function (
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

export const getTasksWithToggledTaskIsDone = function (
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

// True, if task status is matched with filter and false, if task status is not matched
export const checkSelection = function (
  selectedFilter: string,
  taskStatus: boolean
) {
  return (
    selectedFilter === "filter-all" ||
    (selectedFilter === "filter-active" && !taskStatus) ||
    (selectedFilter === "filter-completed" && taskStatus)
  );
};

export const uuidv4 = function (): string {
  // @ts-ignore
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};
