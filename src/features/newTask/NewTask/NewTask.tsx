import React from "react";
import { newTaskActions, selectNewTask } from "../newTaskSlice";
import styles from "./NewTask.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { selectActiveTaskGroupId } from "../../taskGroupsList/taskGroupListSlice";
import { useCreateTaskMutation } from "../../api/apiSlice";

function NewTask() {
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  const newTaskTitle = useAppSelector(selectNewTask);
  const [addNewTask, { isLoading }] = useCreateTaskMutation();
  const dispatch = useAppDispatch();

  const handleSubmit = function (e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    asyncSubmitHandling();
  };

  const asyncSubmitHandling = async () => {
    if (newTaskTitle.trim() && !isLoading) {
      try {
        await addNewTask({
          taskList: activeTaskGroupId,
          title: newTaskTitle.trim(),
        }).unwrap();
        dispatch(newTaskActions.changeNewTaskValue(""));
      } catch (err) {
        console.error("Failed to save the post: ", err);
      }
    }
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
