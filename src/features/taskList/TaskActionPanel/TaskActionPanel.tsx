import React from "react";
import "./TaskActionPanel.css";
import { ITask } from "../../../interfaces";

interface TaskActionPanelProps {
  taskInfo: ITask;
}

function TaskActionPanel({ taskInfo }: TaskActionPanelProps) {
  return (
    <div className="task-action-panel">
      <span
        className="material-symbols-outlined button-edit"
        data-taskid={taskInfo.taskId}
      >
        edit
      </span>
      <span
        className="material-symbols-outlined button-delete"
        data-taskid={taskInfo.taskId}
      >
        delete
      </span>
    </div>
  );
}

export default TaskActionPanel;
