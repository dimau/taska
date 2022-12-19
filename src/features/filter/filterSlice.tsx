import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IGoogleTaskDescription } from "../../interfaces";

let initialState = "filter-all";

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
