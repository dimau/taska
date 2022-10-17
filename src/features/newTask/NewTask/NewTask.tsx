import React from "react";
import { newTaskActions, selectNewTask } from "../newTaskSlice";
import "./NewTask.css";
import { taskListActions } from "../../taskList/taskListSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

function NewTask() {
  const newTaskTitle = useAppSelector(selectNewTask);
  const dispatch = useAppDispatch();

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(taskListActions.addNewTask(newTaskTitle));
  };

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
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
