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
import { Draggable } from "react-beautiful-dnd";

interface TaskProps {
  taskInfo: IGoogleTaskDescription;
  index: number;
}

export function Task({ taskInfo, index }: TaskProps) {
  const activeTaskId = useAppSelector(selectActiveTaskId);
  const dispatch = useAppDispatch();

  // Toggling task active / not active
  const toggleActive = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch(taskListActions.changeActiveTask({ activeTaskId: taskInfo.id }));
  };

  return (
    <Draggable draggableId={taskInfo.id} index={index}>
      {(provided) => (
        <div
          className={clsx(styles.task, hoverStyles.taskHoverParent, {
            [styles.taskDone]: taskInfo.status === "completed",
            [styles.active]: taskInfo.id === activeTaskId,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskCheckbox taskInfo={taskInfo} />
          <TaskTitle taskInfo={taskInfo} toggleActive={toggleActive} />
          <TaskDescription taskInfo={taskInfo} toggleActive={toggleActive} />
          <TaskActionPanel taskInfo={taskInfo} />
        </div>
      )}
    </Draggable>
  );
}
