import React from "react";
import styles from "./Task.module.css";
import hoverStyles from "./TaskHover.module.css";
import TaskActionPanel from "../TaskActionPanel/TaskActionPanel";
import { useAppSelector } from "../../../app/hooks";
import { selectActiveTaskGroupId } from "../../taskGroupsList/taskGroupListSlice";
import { useToggleTaskStatusMutation } from "../../api/apiSlice";
import { IGoogleTaskDescription } from "../../../interfaces";

interface TaskProps {
  taskInfo: IGoogleTaskDescription;
}

function Task({ taskInfo }: TaskProps) {
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);

  // Toggling tasks (completed / not completed)
  const [toggleTask, { isLoading: isLoadingToggling }] =
    useToggleTaskStatusMutation();

  const handleToggle = function (e: React.ChangeEvent<HTMLInputElement>) {
    asyncToggleHandling({
      taskId: e.target.dataset.taskid as string,
      taskListId: activeTaskGroupId,
      newStatus: e.target.checked ? "completed" : "needsAction",
    });
  };

  const asyncToggleHandling = async ({
    taskId,
    taskListId,
    newStatus,
  }: {
    taskId: string;
    taskListId: string;
    newStatus: string;
  }) => {
    if (!isLoadingToggling) {
      try {
        await toggleTask({
          newStatus,
          taskListId,
          taskId,
        });
      } catch (err) {
        console.error("Failed to toggle the task status", err);
      }
    }
  };

  return (
    <div
      className={`${styles.task} ${
        taskInfo.status === "completed" ? styles.taskDone : ""
      } ${hoverStyles.taskHoverParent}`}
    >
      <input
        type="checkbox"
        checked={taskInfo.status === "completed"}
        onChange={handleToggle}
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
