import React from "react";
import styles from "./Task.module.css";
import hoverStyles from "./TaskHover.module.css";
import { TaskActionPanel } from "../TaskActionPanel/TaskActionPanel";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectActiveTaskGroupId } from "../../taskGroupsList/taskGroupListSlice";
import { useToggleTaskStatusMutation } from "../../api/apiSlice";
import { IGoogleTaskDescription } from "../../../interfaces";
import clsx from "clsx";
import { selectActiveTaskId, taskListActions } from "../taskListSlice";

interface TaskProps {
  taskInfo: IGoogleTaskDescription;
}

export function Task({ taskInfo }: TaskProps) {
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  const activeTaskId = useAppSelector(selectActiveTaskId);
  const dispatch = useAppDispatch();

  // Toggling task active / not active
  const toggleActive = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // It's click on label with text and we should handle it in another function
    if (e.target !== e.currentTarget) return;
    dispatch(taskListActions.changeActiveTask({ activeTaskId: taskInfo.id }));
  };

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
      className={clsx(styles.task, hoverStyles.taskHoverParent, {
        [styles.taskDone]: taskInfo.status === "completed",
        [styles.active]: taskInfo.id === activeTaskId,
      })}
    >
      <input
        type="checkbox"
        checked={taskInfo.status === "completed"}
        onChange={handleToggle}
        data-taskid={taskInfo.id}
        id={taskInfo.id}
        className={styles.input}
      />
      <div className={styles.taskTitle} onClick={toggleActive}>
        <label htmlFor={taskInfo.id}>{taskInfo.title}</label>
      </div>
      <div
        className={clsx(styles.description, {
          [styles.opened]: activeTaskId === taskInfo.id,
        })}
      >
        {taskInfo.notes}
      </div>
      <TaskActionPanel taskInfo={taskInfo} />
    </div>
  );
}
