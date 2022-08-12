import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeNewTaskValue, selectNewTask} from "../newTaskSlice";
import './NewTask.css';
import {addNewTask} from "../../taskList/taskListSlice";

function NewTask(props) {
    const newTaskTitle = useSelector(selectNewTask);
    const dispatch = useDispatch();

    const handleSubmit = function(e) {
        e.preventDefault();
        dispatch( addNewTask(newTaskTitle) );
    }

    const handleChange = function(e) {
        dispatch( changeNewTaskValue(e.target.value) );
    }

    return (
        <form className='new-task' onSubmit={handleSubmit}>
            <input
                type='text'
                className='new-task__input'
                placeholder='Add New'
                value={newTaskTitle}
                onChange={handleChange}
                autoFocus
            />
        </form>
    );
}

export default NewTask;