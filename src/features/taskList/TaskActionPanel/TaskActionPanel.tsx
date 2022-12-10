import React from "react";
import styles from "./TaskActionPanel.module.css";
import hoverStyles from "../Task/TaskHover.module.css";
import { IGoogleTaskDescription } from "../../api/interfaces";

interface TaskActionPanelProps {
  taskInfo: IGoogleTaskDescription;
}

function TaskActionPanel({ taskInfo }: TaskActionPanelProps) {
  return (
    <div className={`${hoverStyles.taskHoverChild} ${styles.taskActionPanel}`}>
      <span
        className={`material-symbols-outlined button-edit ${styles.icon}`}
        data-taskid={taskInfo.id}
      >
        edit
      </span>
      <span
        className={`material-symbols-outlined button-delete ${styles.icon}`}
        data-taskid={taskInfo.id}
      >
        delete
      </span>
    </div>
  );
}

export default TaskActionPanel;
