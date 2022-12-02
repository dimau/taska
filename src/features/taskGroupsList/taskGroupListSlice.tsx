import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITaskGroupEntities } from "../../interfaces";

interface ITaskGroupState {
  entities: ITaskGroupEntities;
  ids: string[];
}

const initialState: ITaskGroupState = {
  entities: {},
  ids: [],
};

export const taskGroupsListSlice = createSlice({
  name: "taskGroups",
  initialState,
  reducers: {
    successLoading: (state, action: PayloadAction<ITaskGroupState>) => {
      state.entities = {
        ...state.entities,
        ...action.payload.entities,
      };
      state.ids = Array.from(new Set([...state.ids, ...action.payload.ids]));
      return state;
    },
  },
});

export const taskGroupsListReducer = taskGroupsListSlice.reducer;
export const taskGroupsListActions = {
  ...taskGroupsListSlice.actions,
};
