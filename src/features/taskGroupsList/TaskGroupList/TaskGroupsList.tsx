import React, { useEffect } from "react";
import { TaskGroup } from "../TaskGroup/TaskGroup";
import styles from "./TaskGroupsList.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { loadTaskGroupsGoogle } from "../loadTaskGroupsGoogle";
import { selectAllTaskGroups } from "../selectors";
import {
  googleTasksApi,
  useGetAllTaskListsQuery,
} from "../../../services/googleTasks";

export function TaskGroupsList() {
  // Load Google task lists (task groups) from Google REST API
  const { allTaskGroups: , error, isLoading } = useGetAllTaskListsQuery("");
  //const { data, error, isLoading } = googleTasksApi.endpoints.getAllTaskLists.useQuery("");

  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   //// @ts-ignore TODO: how to solve this problem?
  //   dispatch(loadTaskGroupsGoogle);
  // }, []);

  // Take all task groups loaded from Google or localStorage
  // let allTaskGroups = useAppSelector(selectAllTaskGroups);

  // Show all groups in panel in UI
  return (
    <div className={styles.root}>
      {error ? (
          <>Please try later, there was an error with Google Api</>
      ) : isLoading ? (
          <>Loading...</>
      ) : allTaskGroups ? (
              <>
      Object.values(allTaskGroups).map((group) => (
                    <TaskGroup
                        groupName={group.title}
                        key={group.id}
                        active={group.title == "Second List" ? true : false} // TODO active choose
                    />
                ))
      </>
      ) : null}
    </div>
  );
}
