import React from "react";
import styles from "./TaskGroup.module.css";
import clsx from "clsx";

interface ITaskGroupProps {
  groupName: string;
  active: boolean;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

export function TaskGroup({ groupName, active, onClick }: ITaskGroupProps) {
  return (
    <div
      className={clsx(styles.root, {
        [styles.active]: active,
      })}
      onClick={onClick}
    >
      {groupName}
    </div>
  );
}
