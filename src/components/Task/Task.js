import React from "react";
import './Task.css';

function Task(props) {
    return (
        <div className={`task ${props.taskInfo.isDone ? 'task_done' : ''}`}>
            <input type='checkbox' className='task__checkbox' checked={props.taskInfo.isDone} data-taskid={props.taskInfo.taskid} id={props.taskInfo.taskid}/>
            <label className='task__title' for={props.taskInfo.taskid}>{props.taskInfo.title}</label>
        </div>
    );
}

export default Task;