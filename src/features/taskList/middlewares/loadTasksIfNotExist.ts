import { taskListActions, TaskListState } from "../tasksSlice";

// @ts-ignore // TODO
export function loadTasksIfNotExist(dispatch, getState) {
  const tasksJSON = localStorage.getItem("tasks");
  if (!tasksJSON) return;
  const tasks: TaskListState = JSON.parse(tasksJSON);
  dispatch(taskListActions.successLoading(tasks));
}
