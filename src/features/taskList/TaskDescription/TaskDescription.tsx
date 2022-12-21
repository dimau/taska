import clsx from "clsx";
import styles from "./TaskDescription.module.css";
import React from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectActiveTaskId } from "../taskListSlice";
import { IGoogleTaskDescription } from "../../../interfaces";

interface ITaskDescriptionProps {
  taskInfo: IGoogleTaskDescription;
  toggleActive: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function TaskDescription({
  taskInfo,
  toggleActive,
}: ITaskDescriptionProps) {
  const activeTaskId = useAppSelector(selectActiveTaskId);

  return (
    <div
      className={clsx(styles.description, {
        [styles.opened]: activeTaskId === taskInfo.id,
      })}
      onClick={toggleActive}
    >
      {taskInfo.notes}
    </div>
  );
}
