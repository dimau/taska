import React from "react";
import styles from "./TaskGroup.module.css";
import clsx from "clsx";
import {
  selectActiveTaskGroupId,
  taskGroupListActions,
} from "../taskGroupListSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

interface ITaskGroupProps {
  groupId: string;
  groupTitle: string;
}

export function TaskGroup({ groupId, groupTitle }: ITaskGroupProps) {
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  const dispatch = useAppDispatch();

  const handleClick = function (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    if (groupId === activeTaskGroupId) return;
    dispatch(
      taskGroupListActions.changeActiveGroup({
        activeTaskGroupListId: groupId,
        activeTaskGroupListTitle: groupTitle,
      })
    );
  };

  return (
    <div
      className={clsx(styles.root, {
        [styles.active]: groupId === activeTaskGroupId,
      })}
      onClick={handleClick}
    >
      {groupTitle}
    </div>
  );
}
