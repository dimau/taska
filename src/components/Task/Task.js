import React from "react";
import './Task.css';
import TaskActionPanel from "../TaskActionPanel/TaskActionPanel";

function Task(props) {
    return (
        <div className={`task ${props.taskInfo.isDone ? 'task_done' : ''}`}>
            <input
                type='checkbox'
                className='task__checkbox'
                checked={props.taskInfo.isDone}
                onChange={()=>{}} // we will handle this event on the TaskList component level, so it's just to remove warning in browser
                data-taskid={props.taskInfo.taskid}
                id={props.taskInfo.taskid}
            />
            <label className='task__title' htmlFor={props.taskInfo.taskid}>{props.taskInfo.title}</label>
            <TaskActionPanel taskInfo={props.taskInfo} />
        </div>
    );
}

export default Task;