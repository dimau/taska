import styles from "./TaskCheckbox.module.css";
import React from "react";
import { useToggleTaskStatusMutation } from "../../api/apiSlice";
import { useAppSelector } from "../../../app/hooks";
import { selectActiveTaskGroupId } from "../../taskGroupsList/taskGroupListSlice";
import { IGoogleTaskDescription } from "../../../interfaces";

interface TaskCheckboxProps {
  taskInfo: IGoogleTaskDescription;
}

export function TaskCheckbox({ taskInfo }: TaskCheckboxProps) {
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
    <div className={styles.root}>
      <input
        type="checkbox"
        checked={taskInfo.status === "completed"}
        onChange={handleToggle}
        data-taskid={taskInfo.id}
        id={taskInfo.id}
      />
    </div>
  );
}
