import { combineReducers } from "redux";
import { newTaskReducer } from "../features/newTask/newTaskSlice";
import { taskListReducer } from "../features/taskList/tasksSlice";
import { filterReducer } from "../features/filter/filterSlice";
import { authReducer } from "../features/authorization/authSlice";
import { configureStore } from "@reduxjs/toolkit";

// Imports for using redux-persist to persist store in Local Storage
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { taskGroupsListReducer } from "../features/taskGroupsList/taskGroupListSlice";
import { googleTasksApi } from "../services/googleTasks";

const rootReducer = combineReducers({
  tasks: taskListReducer,
  newTask: newTaskReducer,
  selectedFilter: filterReducer,
  auth: authReducer,
  taskGroups: taskGroupsListReducer,
  [googleTasksApi.reducerPath]: googleTasksApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`
    googleTasksApi.middleware,
  ],
});

const persistedStore = persistStore(store);

// All exports here
export { store, persistedStore };
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
