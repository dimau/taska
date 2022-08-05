import React from "react";
import './TaskList.css';
import Task from "../Task/Task";

function TaskList(props) {

    const checkSelection = function(selectedFilter, taskStatus) {
        return (selectedFilter === 'filter-all') ||
               (selectedFilter === 'filter-active' && taskStatus === false) ||
               (selectedFilter === 'filter-completed' && taskStatus === true);
    }

    if (props.tasks.length === 0) {
        return <div>You don't have tasks, bastard!</div>
    }

    return (
        <div className='task-list' onChange={props.onChange}>
            {props.tasks.map( task => {
                if (checkSelection(props.selectedFilter, task.isDone)) {
                    return <Task taskInfo={task} key={task.title} />
                } else { return null; }
            })}
        </div>
    );
}

export default TaskList;