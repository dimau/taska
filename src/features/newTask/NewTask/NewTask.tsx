import React from "react";
import { newTaskActions, selectNewTask } from "../newTaskSlice";
import styles from "./NewTask.module.css";
import { taskListActions } from "../../taskList/tasksSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

function NewTask() {
  const newTaskTitle = useAppSelector(selectNewTask);
  const dispatch = useAppDispatch();

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(taskListActions.addNewTask({ title: newTaskTitle }));
  };

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(newTaskActions.changeNewTaskValue(e.target.value));
  };

  return (
    <form className={styles.newTask} onSubmit={handleSubmit}>
      <input
        type="text"
        className={styles.newTaskInput}
        placeholder="Add New"
        value={newTaskTitle}
        onChange={handleChange}
        autoFocus
      />
    </form>
  );
}

export default NewTask;
