import React from "react";
import { TaskGroup } from "../TaskGroup/TaskGroup";
import styles from "./TaskGroupsList.module.css";

interface TaskGroupsListProps {
  groups: string[];
}

export function TaskGroupsList({ groups }: TaskGroupsListProps) {
  return (
    <div className={styles.root}>
      {groups.map((group) => (
        <TaskGroup
          groupName={group}
          key={group}
          active={group == "Second List" ? true : false}
        />
      ))}
    </div>
  );
}
