import clsx from "clsx";
import styles from "./TaskDescription.module.css";
import React, { useCallback, useRef, useState } from "react";
import { useAppSelector } from "../../../app/hooks";
import { selectActiveTaskId } from "../taskListSlice";
import { IGoogleTaskDescription } from "../../../interfaces";
import { selectActiveTaskGroupId } from "../../taskGroupsList/taskGroupListSlice";
import { useEditTaskMutation } from "../../api/apiSlice";
import { useAutosizeTextArea } from "../useAutoSizeTextArea";

interface ITaskDescriptionProps {
  taskInfo: IGoogleTaskDescription;
  toggleActive: (e: React.MouseEvent<HTMLFormElement, MouseEvent>) => void;
}

export function TaskDescription({
  taskInfo,
  toggleActive,
}: ITaskDescriptionProps) {
  const activeTaskId = useAppSelector(selectActiveTaskId);
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(taskInfo.notes);
  const [editTask, { isLoading: isLoadingEditing }] = useEditTaskMutation();

  // We need direct ref to form to manually fire onsubmit event when user press Enter (without Shift) in the textarea
  const formRef = useRef<HTMLFormElement>(null);

  // We need direct ref to textarea for focusing and for adding auto-size to the textarea element
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, value);

  // Function for auto setting focus on textarea when it's appear
  const setFocus = useCallback((element: HTMLTextAreaElement) => {
    if (element) {
      element.focus();
      // @ts-ignore
      textAreaRef.current = element;

      // Initial height of textarea adoption to the initial content height
      element.style.height = "0px";
      const scrollHeight = element.scrollHeight;
      element.style.height = scrollHeight + "px";
    }
  }, []);

  const handleClickOnText = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    setIsEditing(true);
  };

  const handleLossFocusEditText = () => {
    setIsEditing(false);
    setValue(taskInfo.notes);
  };

  const handleChange = function (e: React.ChangeEvent<HTMLTextAreaElement>) {
    const val = e.target?.value;
    setValue(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter") return;
    // If user press Enter without Shift => apply the changes to description (end of editing), otherwise - new string
    if (!e.shiftKey && formRef.current) {
      e.preventDefault(); // doesn't apply enter click like a new string
      formRef.current.dispatchEvent(new Event("submit", { bubbles: true })); // fire submit event
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoadingEditing && value !== taskInfo.notes) {
      try {
        await editTask({
          description: value,
          taskListId: activeTaskGroupId,
          taskId: taskInfo.id,
        });
      } catch (err) {
        console.error("Failed to edit the task description", err);
      }
    }
    setIsEditing(false);
  };

  return (
    <form
      className={clsx(styles.description, {
        [styles.opened]: activeTaskId === taskInfo.id,
      })}
      onClick={toggleActive}
      onSubmit={handleSubmit}
      ref={formRef}
    >
      {isEditing ? (
        <textarea
          value={value}
          onBlur={handleLossFocusEditText}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className={styles.textArea}
          ref={setFocus}
          rows={1}
        />
      ) : (
        <div onClick={handleClickOnText} className={styles.label}>
          {taskInfo.notes}
        </div>
      )}
    </form>
  );
}
