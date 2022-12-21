import React from "react";
import styles from "./Task.module.css";
import hoverStyles from "./TaskHover.module.css";
import { TaskActionPanel } from "../TaskActionPanel/TaskActionPanel";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { IGoogleTaskDescription } from "../../../interfaces";
import clsx from "clsx";
import { selectActiveTaskId, taskListActions } from "../taskListSlice";
import { TaskTitle } from "../TaskTitle/TaskTitle";
import { TaskDescription } from "../TaskDescription/TaskDescription";
import { TaskCheckbox } from "../TaskCheckbox/TaskCheckbox";

interface TaskProps {
  taskInfo: IGoogleTaskDescription;
}

export function Task({ taskInfo }: TaskProps) {
  const activeTaskId = useAppSelector(selectActiveTaskId);
  const dispatch = useAppDispatch();

  // Toggling task active / not active
  const toggleActive = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch(taskListActions.changeActiveTask({ activeTaskId: taskInfo.id }));
  };

  return (
    <div
      className={clsx(styles.task, hoverStyles.taskHoverParent, {
        [styles.taskDone]: taskInfo.status === "completed",
        [styles.active]: taskInfo.id === activeTaskId,
      })}
    >
      <TaskCheckbox taskInfo={taskInfo} />
      <TaskTitle taskInfo={taskInfo} toggleActive={toggleActive} />
      <TaskDescription taskInfo={taskInfo} toggleActive={toggleActive} />
      <TaskActionPanel taskInfo={taskInfo} />
    </div>
  );
}
