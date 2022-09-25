import React from "react";
import "./TaskActionPanel.css";

function TaskActionPanel(props) {
  return (
    <div className="task-action-panel">
      <span
        className="material-symbols-outlined button-edit"
        data-taskid={props.taskInfo.taskId}
      >
        edit
      </span>
      <span
        className="material-symbols-outlined button-delete"
        data-taskid={props.taskInfo.taskId}
      >
        delete
      </span>
    </div>
  );
}

export default TaskActionPanel;
