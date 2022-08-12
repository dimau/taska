import React from "react";
import './TaskList.css';
import Task from "../Task/Task";
import {useDispatch, useSelector} from "react-redux";
import {deleteTask, selectAllFilteredTasks, toggleTaskIsDone} from "../taskListSlice";
import { selectCurrentFilter } from "../../filter/filterSlice";

function TaskList(props) {

    const currentFilter = useSelector(selectCurrentFilter);
    const allFilteredTasks = useSelector( state => selectAllFilteredTasks(state, currentFilter) );
    const dispatch = useDispatch();
    
    const handleClick = function(e) {
        // If user click delete button for the task
        if (e.target.classList.contains('button-delete')) {
            dispatch( deleteTask(e.target.dataset.taskid) );
        }
    }

    const handleChange = function(e) {
        dispatch( toggleTaskIsDone(e.target.dataset.taskid, e.target.checked) )
    }

    // If we don't have any task to show to the user
    if (allFilteredTasks.length === 0) {
        return <div>You don't have tasks, bastard!</div>
    }

    return (
        <div className='task-list' onChange={handleChange} onClick={handleClick}>
            {allFilteredTasks.map( task => <Task taskInfo={task} key={task.title} /> )}
        </div>
    );
}

export default TaskList;