import React, { useState } from "react";
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
import { TaskModalEditor } from "../TaskModalEditor/TaskModalEditor";

interface TaskProps {
  taskInfo: IGoogleTaskDescription;
  index: number;
}

export function Task({ taskInfo, index }: TaskProps) {
  const activeTaskId = useAppSelector(selectActiveTaskId);
  const dispatch = useAppDispatch();

  // Modal window for editing task
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Toggling task active / not active
  const toggleActive = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    dispatch(taskListActions.changeActiveTask({ activeTaskId: taskInfo.id }));
  };

  return (
    <Draggable draggableId={taskInfo.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={clsx(styles.task, hoverStyles.taskHoverParent, {
            [styles.taskDone]: taskInfo.status === "completed",
            [styles.active]: taskInfo.id === activeTaskId,
            [styles.isDragging]: snapshot.isDragging,
          })}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {isOpenModal && (
            <TaskModalEditor
              taskInfo={taskInfo}
              onClose={() => setIsOpenModal(false)}
            />
          )}
          <TaskCheckbox taskInfo={taskInfo} />
          <TaskTitle taskInfo={taskInfo} toggleActive={toggleActive} />
          <TaskDescription taskInfo={taskInfo} toggleActive={toggleActive} />
          <TaskActionPanel
            taskInfo={taskInfo}
            onEdit={() => setIsOpenModal(true)}
          />
        </div>
      )}
    </Draggable>
  );
}
