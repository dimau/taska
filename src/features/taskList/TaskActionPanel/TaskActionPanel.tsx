import React from "react";
import styles from "./TaskActionPanel.module.css";
import hoverStyles from "../Task/TaskHover.module.css";
import { ITask } from "../../../interfaces";

interface TaskActionPanelProps {
  taskInfo: ITask;
}

function TaskActionPanel({ taskInfo }: TaskActionPanelProps) {
  return (
    <div className={`${hoverStyles.taskHoverChild} ${styles.taskActionPanel}`}>
      <span
        className={`material-symbols-outlined button-edit ${styles.icon}`}
        data-taskid={taskInfo.taskId}
      >
        edit
      </span>
      <span
        className={`material-symbols-outlined button-delete ${styles.icon}`}
        data-taskid={taskInfo.taskId}
      >
        delete
      </span>
    </div>
  );
}

export default TaskActionPanel;
