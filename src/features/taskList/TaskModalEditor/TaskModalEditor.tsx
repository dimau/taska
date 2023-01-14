import React, { useCallback, useRef, useState } from "react";
import { Modal } from "../../../components/Modal/Modal";
import { IEditTaskParams, IGoogleTaskDescription } from "../../../interfaces";
import styles from "./TaskModalEditor.module.css";
import { dateFormatterForInput } from "../utils";
import { useAutosizeTextArea } from "../useAutoSizeTextArea";
import { useEditTaskMutation } from "../../api/apiSlice";
import { useAppSelector } from "../../../app/hooks";
import { selectActiveTaskGroupId } from "../../taskGroupsList/taskGroupListSlice";

interface ITaskModalEditorProps {
  taskInfo: IGoogleTaskDescription;
  onClose: () => void;
}

export function TaskModalEditor({ taskInfo, onClose }: ITaskModalEditorProps) {
  // Variables for temporary keeping new values in input fields
  const [titleValue, setTitleValue] = useState(taskInfo.title);
  const [descriptionValue, setDescriptionValue] = useState(taskInfo.notes);
  const [dueDateValue, setDueDateValue] = useState(
    dateFormatterForInput(taskInfo.due)
  );

  // We need direct ref to textarea for focusing and for adding auto-size to the textarea element
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const MIN_DESCRIPTION_HEIGHT = 135;
  const MAX_DESCRIPTION_HEIGHT = 400;
  useAutosizeTextArea(
    textAreaRef.current,
    descriptionValue,
    MIN_DESCRIPTION_HEIGHT,
    MAX_DESCRIPTION_HEIGHT
  );

  // Function for auto setting focus on textarea when it's appear
  const setFocus = useCallback((element: HTMLTextAreaElement) => {
    if (element) {
      element.focus();
      // @ts-ignore
      textAreaRef.current = element;

      // Initial height of textarea adoption to the initial content height
      element.style.height = "0px";
      let scrollHeight = element.scrollHeight;
      if (scrollHeight < MIN_DESCRIPTION_HEIGHT)
        scrollHeight = MIN_DESCRIPTION_HEIGHT;
      if (scrollHeight > MAX_DESCRIPTION_HEIGHT)
        scrollHeight = MAX_DESCRIPTION_HEIGHT;
      element.style.height = scrollHeight + "px";
    }
  }, []);

  // Handle change events for each input
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target?.value;
    setTitleValue(val);
  };

  const handleChangeDescription = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const val = e.target?.value;
    setDescriptionValue(val);
  };

  const handleChangeDueDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target?.value;
    setDueDateValue(val);
  };

  // Handle Submit new title, description or due date value to REST API
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  const [editTask, { isLoading: isLoadingEditing }] = useEditTaskMutation();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoadingEditing) {
      const editParamsObj: IEditTaskParams = {
        taskListId: activeTaskGroupId,
        taskId: taskInfo.id,
      };

      if (titleValue !== taskInfo.title) editParamsObj.title = titleValue;
      if (descriptionValue !== taskInfo.notes)
        editParamsObj.description = descriptionValue;
      if (dueDateValue !== dateFormatterForInput(taskInfo.due))
        editParamsObj.due = dueDateValue + "T00:00:00.000Z";

      try {
        await editTask(editParamsObj);
      } catch (err) {
        console.error(
          "Failed to edit the task parameters in modal window",
          err
        );
      }
    }
    onClose();
  };

  return (
    <Modal
      title={
        <input
          value={titleValue}
          className={styles.titleInput}
          onChange={handleChangeTitle}
        />
      }
      onClose={onClose}
    >
      {
        <form className={styles.root} onSubmit={handleSubmit}>
          <div className={styles.descriptionBox}>
            <label htmlFor={"textarea"}>Description:</label>
            <textarea
              id={"textarea"}
              value={descriptionValue}
              rows={1}
              onChange={handleChangeDescription}
              ref={setFocus}
              className={styles.descriptionInput}
            />
          </div>

          <input
            type="date"
            className={styles.dateInput}
            value={dueDateValue}
            onChange={handleChangeDueDate}
          />

          <div className={styles.buttonsBox}>
            <button onClick={onClose}>Cancel</button>
            <button type="submit">Save</button>
          </div>
        </form>
      }
    </Modal>
  );
}
