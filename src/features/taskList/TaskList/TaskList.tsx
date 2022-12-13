import React from "react";
import styles from "./TaskList.module.css";
import Task from "../Task/Task";
import { taskListActions } from "../tasksSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  useDeleteTaskMutation,
  useGetTasksByTaskListIdQuery,
} from "../../api/apiSlice";
import { selectActiveTaskGroupId } from "../../taskGroupsList/taskGroupListSlice";

function TaskList() {
  // Load Google tasks for specific active Task List from Google REST API
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  const { data, isLoading, isSuccess, isError, error } =
    useGetTasksByTaskListIdQuery({
      taskListId: `${activeTaskGroupId}`,
    });

  // Deleting tasks
  const [deleteTask, { isLoading: isLoadingDeletion }] =
    useDeleteTaskMutation();

  // const currentFilter = useAppSelector(selectCurrentFilter);
  // const allFilteredTasks = useAppSelector((state: RootState) =>
  //   selectAllFilteredTasks(state, currentFilter)
  // );
  const dispatch = useAppDispatch();

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

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(
      taskListActions.toggleTaskIsDone({
        taskId: e.target.dataset.taskid as string,
        isDoneNewValue: e.target.checked,
      })
    );
  };

  // // If we don't have any task to show to the user
  // if (allFilteredTasks.length === 0) {
  //   return (
  //     <div className={styles.allDoneBlock}>It's all done, time to relax!</div>
  //   );
  // }

  // Show all groups in panel in UI
  return (
    <div
      className={styles.taskList}
      onChange={handleChange}
      onClick={handleClick}
    >
      {isError ? (
        <>
          Please try later, there was an error with Google Api:{" "}
          {error.toString()}
        </>
      ) : isLoading ? (
        <>Loading...</>
      ) : isSuccess ? (
        <>
          {data.items.map((task) => (
            <Task taskInfo={task} key={task.id} />
          ))}
        </>
      ) : null}
    </div>
  );
}

export default TaskList;
