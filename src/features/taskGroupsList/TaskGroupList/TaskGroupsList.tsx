import React from "react";
import { TaskGroup } from "../TaskGroup/TaskGroup";
import styles from "./TaskGroupsList.module.css";
import { useGetTasksListsQuery } from "../../api/apiSlice";

export function TaskGroupsList() {
  // Load Google task lists (task groups) from Google REST API
  const { data, isLoading, isSuccess, isError, error } = useGetTasksListsQuery(
    {}
  );

  // Show all groups in panel in UI
  return (
    <div className={styles.root}>
      {isError ? (
        <>
          Please try later, there was an error with Google Api:{" "}
          {error.toString()}
        </>
      ) : isLoading ? (
        <>Loading...</>
      ) : isSuccess ? (
        <>
          {data.items.map((group) => (
            <TaskGroup
              groupName={group.title}
              key={group.id}
              active={group.title == "Second List" ? true : false} // TODO active choose
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
