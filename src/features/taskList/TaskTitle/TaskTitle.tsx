import styles from "./TaskTitle.module.css";
import React, { useCallback, useState } from "react";
import { useEditTaskMutation } from "../../api/apiSlice";
import { IGoogleTaskDescription } from "../../../interfaces";
import clsx from "clsx";
import { useAppSelector } from "../../../app/hooks";
import { selectActiveTaskGroupId } from "../../taskGroupsList/taskGroupListSlice";

interface ITaskTitleProps {
  toggleActive: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  taskInfo: IGoogleTaskDescription;
}

export function TaskTitle({ toggleActive, taskInfo }: ITaskTitleProps) {
  // Function for auto setting focus on input when it's appear
  const setFocus = useCallback((element: HTMLInputElement) => {
    if (element) element.focus();
  }, []);

  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  const [isEditing, setIsEditing] = useState(false);
  const [newTitleValue, setNewTitleValue] = useState(taskInfo.title);
  const [editTask, { isLoading: isLoadingEditing }] = useEditTaskMutation();

  const handleClickOnTitle = (
    e: React.MouseEvent<HTMLLabelElement, MouseEvent>
  ) => {
    setIsEditing(true);
  };

  const handleLossFocusEditTitle = () => {
    setIsEditing(false);
    setNewTitleValue(taskInfo.title);
  };

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    setNewTitleValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    asyncEditTitleHandling();
    setIsEditing(false);
  };

  const asyncEditTitleHandling = async () => {
    if (!isLoadingEditing) {
      try {
        await editTask({
          title: newTitleValue,
          taskListId: activeTaskGroupId,
          taskId: taskInfo.id,
        });
      } catch (err) {
        console.error("Failed to edit the task title", err);
      }
    }
  };

  return (
    <form
      className={clsx(styles.taskTitle, {
        [styles.taskDone]: taskInfo.status === "completed",
      })}
      onClick={toggleActive}
      onSubmit={handleSubmit}
    >
      {isEditing ? (
        <input
          type="text"
          value={newTitleValue}
          onBlur={handleLossFocusEditTitle}
          onChange={handleChange}
          className={styles.input}
          ref={setFocus}
        />
      ) : (
        <label
          htmlFor={taskInfo.id}
          onClick={handleClickOnTitle}
          className={styles.label}
        >
          {taskInfo.title}
        </label>
      )}
    </form>
  );
}
