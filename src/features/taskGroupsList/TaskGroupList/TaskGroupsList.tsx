import React from "react";
import { TaskGroup } from "../TaskGroup/TaskGroup";
import styles from "./TaskGroupsList.module.css";
import { useGetTasksListsQuery } from "../../api/apiSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  selectActiveTaskGroupId,
  taskGroupListActions,
} from "../taskGroupListSlice";

export function TaskGroupsList() {
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  // Load Google task lists (task groups) from Google REST API
  const { data, isLoading, isSuccess, isError, error } = useGetTasksListsQuery(
    {}
  );

  const dispatch = useAppDispatch();

  const handleClick = function (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    groupId: string,
    groupTitle: string
  ) {
    dispatch(
      taskGroupListActions.changeActiveGroup({
        activeTaskGroupListId: groupId,
        activeTaskGroupListTitle: groupTitle,
      })
    );
  };

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
          Make sure you are logged in
        </div>
      ) : isLoading ? (
        <div className={styles.blockWithMessage}>Loading...</div>
      ) : isSuccess ? (
        <>
          {data.items.map((group) => (
            <TaskGroup
              groupName={group.title}
              key={group.id}
              active={group.id === activeTaskGroupId}
              onClick={(event) => {
                handleClick(event, group.id, group.title);
              }}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
