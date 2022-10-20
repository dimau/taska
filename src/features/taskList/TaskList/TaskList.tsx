import React, { useEffect } from "react";
import styles from "./TaskList.module.css";
import Task from "../Task/Task";
import {
  selectAllFilteredTasks,
  selectTasksSlice,
  taskListActions,
  TaskListState,
} from "../tasksSlice";
import { selectCurrentFilter } from "../../filter/filterSlice";
import { RootState, store } from "../../../app/store";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { loadTasksIfNotExist } from "../middlewares/loadTasksIfNotExist";

function TaskList() {
  const currentFilter = useAppSelector(selectCurrentFilter);
  const allFilteredTasks = useAppSelector((state: RootState) =>
    selectAllFilteredTasks(state, currentFilter)
  );
  const dispatch = useAppDispatch();

  // try to load tasks from LocalStorage
  // @ts-ignore // TODO
  useEffect(() => {
    let tasksJSON = localStorage.getItem("tasks");
    if (!tasksJSON) return;
    const tasks: TaskListState = JSON.parse(tasksJSON);
    dispatch(taskListActions.successLoading(tasks));
  }, []);

  // we have to save all tasks into Local Storage before closing the tab
  useEffect(() => {
    let unionOfTasks: TaskListState;
    const tasksFromLocalStorageJSON = localStorage.getItem("tasks");
    if (tasksFromLocalStorageJSON) {
      const tasksFromLocalStorage = JSON.parse(
        tasksFromLocalStorageJSON
      ) as TaskListState;
      const tasksFromCurrentState = selectTasksSlice(store.getState());

      unionOfTasks = {
        entities: {
          ...tasksFromLocalStorage.entities,
          ...tasksFromCurrentState.entities,
        },
        ids: Array.from(
          new Set([...tasksFromLocalStorage.ids, ...tasksFromCurrentState.ids])
        ),
      };
    } else {
      unionOfTasks = selectTasksSlice(store.getState());
    }

    localStorage.setItem("tasks", JSON.stringify(unionOfTasks)); // TODO need to JSON.stringify(allFilteredTasks) all Tasks
  }, [allFilteredTasks]); // TODO need to JSON.stringify(allFilteredTasks) all Tasks

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
