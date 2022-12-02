import { RootState } from "../../app/store";

export function selectTaskGroupsSlice(state: RootState) {
  return state.taskGroups;
}

export function selectAllTaskGroups(state: RootState) {
  return Object.values(selectTaskGroupsSlice(state).entities);
}
