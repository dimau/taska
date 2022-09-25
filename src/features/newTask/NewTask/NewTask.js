import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { newTaskActions, selectNewTask } from "../newTaskSlice";
import "./NewTask.css";
import { taskListActions } from "../../taskList/taskListSlice";

function NewTask() {
  const newTaskTitle = useSelector(selectNewTask);
  const dispatch = useDispatch();

  const handleSubmit = function (e) {
    e.preventDefault();
    dispatch(taskListActions.addNewTask(newTaskTitle));
  };

  const handleChange = function (e) {
    dispatch(newTaskActions.changeNewTaskValue(e.target.value));
  };

  return (
    <form className="new-task" onSubmit={handleSubmit}>
      <input
        type="text"
        className="new-task__input"
        placeholder="Add New"
        value={newTaskTitle}
        onChange={handleChange}
        autoFocus
      />
    </form>
  );
}

export default NewTask;
