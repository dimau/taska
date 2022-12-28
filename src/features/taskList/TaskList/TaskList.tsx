import React, { useCallback, useRef } from "react";
import styles from "./TaskList.module.css";
import { useAppSelector } from "../../../app/hooks";
import {
  useChangeTaskPositionMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useGetTasksByTaskListIdQuery,
} from "../../api/apiSlice";
import { selectActiveTaskGroupId } from "../../taskGroupsList/taskGroupListSlice";
import {
  createSelectFilteredTasksGroupedByDate,
  selectCurrentFilter,
} from "../../filter/filterSlice";
import { DateGroup } from "../DateGroup/DateGroup";
import { useOutsideActiveTaskClearer } from "./hooks";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { makePrevTaskPositionString } from "../utils";
import { selectAllTasksByTaskListId } from "../taskListSlice";

export function TaskList() {
  // Load Google tasks for specific active Task List from Google REST API (or from RTKQ cache)
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  const currentFilter = useAppSelector(selectCurrentFilter);
  const selectFilteredTasks = useCallback(
    createSelectFilteredTasksGroupedByDate(),
    []
  );
  const { filteredTasks, isLoading, isSuccess, isError, error } =
    useGetTasksByTaskListIdQuery(
      {
        taskListId: `${activeTaskGroupId}`,
      },
      {
        selectFromResult: (result) => ({
          ...result,
          // @ts-ignore
          filteredTasks: selectFilteredTasks(result, currentFilter),
        }),
      }
    );

  // Clear active task if user clicks not in TaskList
  const wrapperRef = useRef(null);
  useOutsideActiveTaskClearer(wrapperRef);

  // Hooks for task positions changing
  const allTasksByTaskListId = useAppSelector(
    selectAllTasksByTaskListId(activeTaskGroupId)
  );
  const [editTask, { isLoading: isLoadingEditing }] = useEditTaskMutation();
  const [changeTaskPosition, { isLoading: isChangingTaskPosition }] =
    useChangeTaskPositionMutation();

  // Deleting tasks
  const [deleteTask, { isLoading: isLoadingDeletion }] =
    useDeleteTaskMutation();

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
      asyncDeleteHandling(e.target.dataset.taskid);
    }
  };

  const asyncDeleteHandling = async (taskId: string) => {
    if (!isLoadingDeletion) {
      try {
        await deleteTask({
          taskList: activeTaskGroupId,
          taskId: taskId,
        });
      } catch (err) {
        console.error("Failed to delete the task", err);
      }
    }
  };

  // Drag and drop of tasks
  const handleOnDragEnd = (result: DropResult) => {
    const { draggableId: taskId, destination } = result;
    const newDueDate = destination?.droppableId;
    const prevTaskPosition = makePrevTaskPositionString(destination?.index);
    const prevTaskId = allTasksByTaskListId.find(
      (task) => task.position === prevTaskPosition
    )?.id;
    if (newDueDate) asyncEditTaskDateHandling(taskId, newDueDate);
    if (prevTaskId) asyncChangingTaskPositionHandling(taskId, prevTaskId);
    console.log({
      droppableId: destination?.droppableId,
      index: destination?.index,
      prevTaskPosition,
      prevTaskId,
    });
  };

  const asyncEditTaskDateHandling = async (
    taskId: string,
    newDueDate: string
  ) => {
    if (!isLoadingEditing) {
      try {
        await editTask({
          due: newDueDate,
          taskListId: activeTaskGroupId,
          taskId: taskId,
        });
      } catch (err) {
        console.error("Failed to edit the task date in the list", err);
      }
    }
  };

  const asyncChangingTaskPositionHandling = async (
    taskId: string,
    prevTaskId: string
  ) => {
    if (!isChangingTaskPosition) {
      try {
        await changeTaskPosition({
          taskListId: activeTaskGroupId,
          taskId: taskId,
          prevTaskId: prevTaskId,
        });
      } catch (err) {
        console.error("Failed to change the task position in the list", err);
      }
    }
  };

  // Show all tasks in UI
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <div className={styles.taskList} onClick={handleClick} ref={wrapperRef}>
        {isError ? (
          <>
            Please try later, there was an error with Google Api:{" "}
            {error.toString()}
          </>
        ) : isLoading ? (
          <>Loading...</>
        ) : isSuccess && filteredTasks.length === 0 ? ( // If we don't have any task to show to the user
          <div className={styles.allDoneBlock}>
            It's all done, time to relax!
          </div>
        ) : isSuccess ? (
          <>
            {filteredTasks.map((dateGroup) => (
              <DateGroup
                date={dateGroup.date}
                tasks={dateGroup.tasks}
                key={dateGroup.date}
              />
            ))}
          </>
        ) : null}
      </div>
    </DragDropContext>
  );
}
