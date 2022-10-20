import { combineReducers } from "redux";
import { newTaskReducer } from "../features/newTask/newTaskSlice";
import { taskListReducer } from "../features/taskList/tasksSlice";
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

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
