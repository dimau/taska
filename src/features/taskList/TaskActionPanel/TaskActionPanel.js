import React from "react";
import './TaskActionPanel.css';

function TaskActionPanel(props) {
    return (
        <div className='task-action-panel'>
            <span className="material-symbols-outlined button-edit" data-taskid={props.taskInfo.taskid}>edit</span>
            <span className="material-symbols-outlined button-delete" data-taskid={props.taskInfo.taskid}>delete</span>
        </div>
    );
}

export default TaskActionPanel;