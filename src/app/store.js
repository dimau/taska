
import { createStore, combineReducers } from 'redux';
import { newTaskReducer } from '../features/newTask/newTaskSlice';
import { tasksReducer } from '../features/taskList/taskListSlice';
import { filterReducer } from '../features/filter/filterSlice';

export const store = createStore(combineReducers({
    tasks: tasksReducer,
    newTask: newTaskReducer,
    selectedFilter: filterReducer
}));