import React from "react";
import "./TaskList.css";
import Task from "../Task/Task";
import { useDispatch, useSelector } from "react-redux";
import { selectAllFilteredTasks, taskListActions } from "../taskListSlice";
import { selectCurrentFilter } from "../../filter/filterSlice";
import { RootState } from "../../../app/store";
import { useAppDispatch } from "../../../app/hooks";

function TaskList() {
  const currentFilter = useSelector(selectCurrentFilter);
  const allFilteredTasks = useSelector((state: RootState) =>
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
      dispatch(taskListActions.deleteTask(e.target.dataset.taskid));
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
    return <div>You don't have tasks, bastard!</div>;
  }

  return (
    <div className="task-list" onChange={handleChange} onClick={handleClick}>
      {allFilteredTasks.map((task) => (
        <Task taskInfo={task} key={task.title} />
      ))}
    </div>
  );
}

export default TaskList;
