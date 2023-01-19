import React from "react";
import { TaskGroup } from "../TaskGroup/TaskGroup";
import styles from "./TaskGroupsList.module.css";
import { useGetTasksListsQuery } from "../../api/apiSlice";

export function TaskGroupsList() {
  // Load Google task lists (task groups) from Google REST API
  const { data, isLoading, isSuccess, isError, error } =
    useGetTasksListsQuery(null);

  if (isError && error) {
    console.error(
      "An error occurred while trying to collect a list of task groups: " +
        error.toString()
    );
  }

  // Show all groups in panel in UI
  return (
    <div className={styles.root}>
      {isError ? (
        <div className={styles.blockWithMessage}>
          Make sure you are logged in and gave the application access to your
          tasks.
          <br />
          You can revoke access in your Google account on this{" "}
          <a
            href="https://myaccount.google.com/permissions?continue=https%3A%2F%2Fmyaccount.google.com%2Fdata-and-privacy
"
          >
            page
          </a>{" "}
          and repeat authorization to the service Taska
        </div>
      ) : isLoading ? (
        <div className={styles.blockWithMessage}>Loading...</div>
      ) : isSuccess ? (
        <>
          {data.items.map((group) => (
            <TaskGroup
              groupId={group.id}
              groupTitle={group.title}
              key={group.id}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
