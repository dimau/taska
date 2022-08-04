import React from "react";
import './TaskList.css';
import Task from "../Task/Task";

function TaskList(props) {
    return (
        <div className='task-list' onChange={props.onChange}>
            {props.tasks.map( task => <Task taskInfo={task} key={task.title} />)}
        </div>
    );
}

export default TaskList;