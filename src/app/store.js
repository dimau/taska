import { combineReducers } from "redux";
import { newTaskReducer } from "../features/newTask/newTaskSlice";
import { taskListReducer } from "../features/taskList/taskListSlice";
import { filterReducer } from "../features/filter/filterSlice";
import { configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  tasks: taskListReducer,
  newTask: newTaskReducer,
  selectedFilter: filterReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
});
