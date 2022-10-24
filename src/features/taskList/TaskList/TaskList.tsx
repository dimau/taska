import React from "react";
import styles from "./TaskList.module.css";
import Task from "../Task/Task";
import { selectAllFilteredTasks, taskListActions } from "../tasksSlice";
import { selectCurrentFilter } from "../../filter/filterSlice";
import { RootState } from "../../../app/store";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

function TaskList() {
  const currentFilter = useAppSelector(selectCurrentFilter);
  const allFilteredTasks = useAppSelector((state: RootState) =>
    selectAllFilteredTasks(state, currentFilter)
  );
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
      dispatch(taskListActions.deleteTask({ taskId: e.target.dataset.taskid }));
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

  // If we don't have any task to show to the user
  if (allFilteredTasks.length === 0) {
    return (
      <div className={styles.allDoneBlock}>It's all done, time to relax!</div>
    );
  }

  return (
    <div
      className={styles.taskList}
      onChange={handleChange}
      onClick={handleClick}
    >
      {allFilteredTasks.map((task) => (
        <Task taskInfo={task} key={task.title} />
      ))}
    </div>
  );
}

export default TaskList;
