import { RootState } from "../../app/store";
import { checkSelection } from "./utils";

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
