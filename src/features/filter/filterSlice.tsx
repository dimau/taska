import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IGoogleTaskDescription } from "../../interfaces";

let initialState = "filter-active";

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    changeCurrentFilter: (state, action: PayloadAction<string>) =>
      action.payload,
  },
});

export const filterReducer = filterSlice.reducer;
export const filterSliceActions = {
  ...filterSlice.actions,
};

/*********************************************/
/* Selector functions for slice state        */
/*********************************************/

export function selectCurrentFilter(state: RootState) {
  return state.selectedFilter;
}

// This selector-creator returns memoized selector instance that works with RTKQ cache instead of Redux State
export function createSelectFilteredTasks() {
  const emptyArray: IGoogleTaskDescription[] = [];
  return createSelector(
    (res: { data: IGoogleTaskDescription[] }) => res.data,
    (res: { data: IGoogleTaskDescription[] }, currentFilter: string) =>
      currentFilter,
    (data, currentFilter) =>
      data?.filter((task) => {
        if (
          task.status === "needsAction" &&
          (currentFilter === "filter-all" || currentFilter === "filter-active")
        )
          return true;
        return (
          task.status === "completed" &&
          (currentFilter === "filter-all" ||
            currentFilter === "filter-completed")
        );
      }) ?? emptyArray
  );
}

// This selector-creator returns memoized selector instance that works with RTKQ cache instead of Redux State
export function createSelectFilteredTasksGroupedByDate() {
  const emptyArray: IGoogleTaskDescription[] = [];
  return createSelector(
    (res: { data: IGoogleTaskDescription[] }) => res.data,
    (res: { data: IGoogleTaskDescription[] }, currentFilter: string) =>
      currentFilter,
    (data, currentFilter) => {
      // First step - filtering tasks
      data =
        data?.filter((task) => {
          if (
            task.status === "needsAction" &&
            (currentFilter === "filter-all" ||
              currentFilter === "filter-active")
          )
            return true;
          return (
            task.status === "completed" &&
            (currentFilter === "filter-all" ||
              currentFilter === "filter-completed")
          );
        }) ?? emptyArray;

      // Second step - grouping by date
      const dateMap: { [date: string]: IGoogleTaskDescription[] } = {};
      for (let task of data) {
        const date = task.due;
        if (dateMap[date]) {
          dateMap[date].push(task);
        } else {
          dateMap[date] = [task];
        }
      }

      // Third step - sorting inside date based on position
      for (let date in dateMap) {
        dateMap[date].sort((a, b) => (a.position > b.position ? 1 : -1));
      }

      // Fourth step - constructing and sorting final array by date
      const res: { date: string; tasks: IGoogleTaskDescription[] }[] = [];
      for (let date in dateMap) {
        res.push({ date: date, tasks: dateMap[date] });
      }
      res.sort((a, b) => (a.date > b.date ? 1 : -1));

      // Return result
      return res;
    }
  );
}
