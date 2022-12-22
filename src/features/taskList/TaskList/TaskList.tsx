import React, { useCallback, useRef } from "react";
import styles from "./TaskList.module.css";
import { useAppSelector } from "../../../app/hooks";
import {
  useDeleteTaskMutation,
  useGetTasksByTaskListIdQuery,
} from "../../api/apiSlice";
import { selectActiveTaskGroupId } from "../../taskGroupsList/taskGroupListSlice";
import {
  createSelectFilteredTasksGroupedByDate,
  selectCurrentFilter,
} from "../../filter/filterSlice";
import { DateGroup } from "../DateGroup/DateGroup";
import { useOutsideActiveTaskClearer } from "./hooks";

export function TaskList() {
  // Load Google tasks for specific active Task List from Google REST API (or from RTKQ cache)
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  const currentFilter = useAppSelector(selectCurrentFilter);
  const selectFilteredTasks = useCallback(
    createSelectFilteredTasksGroupedByDate(),
    []
  );
  const { filteredTasks, isLoading, isSuccess, isError, error } =
    useGetTasksByTaskListIdQuery(
      {
        taskListId: `${activeTaskGroupId}`,
      },
      {
        selectFromResult: (result) => ({
          ...result,
          // @ts-ignore
          filteredTasks: selectFilteredTasks(result, currentFilter),
        }),
      }
    );

  // Clear active task if user clicks not in TaskList
  const wrapperRef = useRef(null);
  useOutsideActiveTaskClearer(wrapperRef);

  // Deleting tasks
  const [deleteTask, { isLoading: isLoadingDeletion }] =
    useDeleteTaskMutation();

  const handleClick = function (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    // Check that we are working with HTMLElement
    if (!(e.target instanceof HTMLElement)) return;

    // If user click delete button for the task
    if (
      e.target.classList.contains("button-delete") &&
      e.target.dataset &&
      e.target.dataset.taskid
    ) {
      asyncDeleteHandling(e.target.dataset.taskid);
    }
  };

  const asyncDeleteHandling = async (taskId: string) => {
    if (!isLoadingDeletion) {
      try {
        await deleteTask({
          taskList: activeTaskGroupId,
          taskId: taskId,
        });
      } catch (err) {
        console.error("Failed to delete the task", err);
      }
    }
  };

  // Show all tasks in UI
  return (
    <div className={styles.taskList} onClick={handleClick} ref={wrapperRef}>
      {isError ? (
        <>
          Please try later, there was an error with Google Api:{" "}
          {error.toString()}
        </>
      ) : isLoading ? (
        <>Loading...</>
      ) : isSuccess && filteredTasks.length === 0 ? ( // If we don't have any task to show to the user
        <div className={styles.allDoneBlock}>It's all done, time to relax!</div>
      ) : isSuccess ? (
        <>
          {filteredTasks.map((dateGroup) => (
            <DateGroup
              date={dateGroup.date}
              tasks={dateGroup.tasks}
              key={dateGroup.date}
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
