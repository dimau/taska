import React from "react";
import styles from "./TaskGroup.module.css";
import clsx from "clsx";

interface ITaskGroupProps {
  groupName: string;
  active: boolean;
}

export function TaskGroup({ groupName, active }: ITaskGroupProps) {
  return (
    <div
      className={clsx(styles.root, {
        [styles.active]: active,
      })}
    >
      {groupName}
    </div>
  );
}
