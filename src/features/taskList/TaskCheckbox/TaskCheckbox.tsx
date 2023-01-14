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

  const handleToggle = async function (e: React.ChangeEvent<HTMLInputElement>) {
    const taskId = e.target.dataset.taskid as string;
    const newStatus = e.target.checked ? "completed" : "needsAction";

    if (!isLoadingToggling) {
      try {
        await toggleTask({
          newStatus: newStatus,
          taskListId: activeTaskGroupId,
          taskId: taskId,
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
