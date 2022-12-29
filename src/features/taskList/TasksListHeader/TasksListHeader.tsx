import React from "react";
import styles from "./TasksListHeader.module.css";
import { useGetTasksByTaskListIdQuery } from "../../api/apiSlice";
import {
  selectActiveTaskGroupId,
  selectActiveTaskGroupTitle,
} from "../../taskGroupsList/taskGroupListSlice";
import { useAppSelector } from "../../../app/hooks";

export function TasksListHeader() {
  // Upload button used refetch for updating current active task list
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  const { refetch } = useGetTasksByTaskListIdQuery({
    taskListId: activeTaskGroupId,
  });

  // Change the Tasks List Header for current active task list name
  const activeTaskGroupTitle = useAppSelector(selectActiveTaskGroupTitle);

  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>
        <span>{activeTaskGroupTitle ? activeTaskGroupTitle : "TO DO"}</span>
        &nbsp;
        <span
          className={`material-symbols-outlined ${styles.refresh}`}
          onClick={refetch}
        >
          refresh
        </span>
      </h1>
    </div>
  );
}
