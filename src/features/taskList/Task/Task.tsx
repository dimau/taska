import React from "react";
import styles from "./Task.module.css";
import hoverStyles from "./TaskHover.module.css";
import TaskActionPanel from "../TaskActionPanel/TaskActionPanel";
import { ITask } from "../../../interfaces";

interface TaskProps {
  taskInfo: ITask;
}

function Task({ taskInfo }: TaskProps) {
  return (
    <div
      className={`${styles.task} ${taskInfo.isDone ? styles.taskDone : ""} ${
        hoverStyles.taskHoverParent
      }`}
    >
      <input
        type="checkbox"
        checked={taskInfo.isDone}
        onChange={() => {}} // we will handle this event on the TaskList component level, so it's just to remove warning in browser
        data-taskid={taskInfo.taskId}
        id={taskInfo.taskId}
      />
      <label className={styles.taskTitle} htmlFor={taskInfo.taskId}>
        {taskInfo.title}
      </label>
      <TaskActionPanel taskInfo={taskInfo} />
    </div>
  );
}

export default Task;
