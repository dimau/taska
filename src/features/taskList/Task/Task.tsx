import React from "react";
import "./Task.css";
import TaskActionPanel from "../TaskActionPanel/TaskActionPanel";
import { ITask } from "../../../interfaces";

interface TaskProps {
  taskInfo: ITask;
}

function Task({ taskInfo }: TaskProps) {
  return (
    <div className={`task ${taskInfo.isDone ? "task_done" : ""}`}>
      <input
        type="checkbox"
        className="task__checkbox"
        checked={taskInfo.isDone}
        onChange={() => {}} // we will handle this event on the TaskList component level, so it's just to remove warning in browser
        data-taskid={taskInfo.taskId}
        id={taskInfo.taskId}
      />
      <label className="task__title" htmlFor={taskInfo.taskId}>
        {taskInfo.title}
      </label>
      <TaskActionPanel taskInfo={taskInfo} />
    </div>
  );
}

export default Task;
