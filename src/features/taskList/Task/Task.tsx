import React from "react";
import styles from "./Task.module.css";
import hoverStyles from "./TaskHover.module.css";
import TaskActionPanel from "../TaskActionPanel/TaskActionPanel";
import { IGoogleTaskDescription } from "../../api/interfaces";

interface TaskProps {
  taskInfo: IGoogleTaskDescription;
}

function Task({ taskInfo }: TaskProps) {
  return (
    <div
      className={`${styles.task} ${
        taskInfo.status === "completed" ? styles.taskDone : ""
      } ${hoverStyles.taskHoverParent}`}
    >
      <input
        type="checkbox"
        checked={taskInfo.status === "completed"}
        onChange={() => {}} // we will handle this event on the TaskList component level, so it's just to remove warning in browser
        data-taskid={taskInfo.id}
        id={taskInfo.id}
      />
      <label className={styles.taskTitle} htmlFor={taskInfo.id}>
        {taskInfo.title}
      </label>
      <TaskActionPanel taskInfo={taskInfo} />
    </div>
  );
}

export default Task;
