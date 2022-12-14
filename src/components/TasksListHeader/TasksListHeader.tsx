import React from "react";
import styles from "./TasksListHeader.module.css";
import { useGetTasksByTaskListIdQuery } from "../../features/api/apiSlice";
import { selectActiveTaskGroupId } from "../../features/taskGroupsList/taskGroupListSlice";
import { useAppSelector } from "../../app/hooks";

export function TasksListHeader() {
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  const { refetch } = useGetTasksByTaskListIdQuery({
    taskListId: activeTaskGroupId,
  });

  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>To do</h1>
      <button onClick={refetch}>Update</button>
    </div>
  );
}
