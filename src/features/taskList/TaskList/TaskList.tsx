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
  createSelectAllTasksSortedByPosition,
  selectCurrentFilter,
} from "../../filter/filterSlice";
import { DateGroup } from "../DateGroup/DateGroup";
import { useOutsideActiveTaskClearer } from "./hooks";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

export function TaskList() {
  // Load Google tasks for specific active Task List from Google REST API (or from RTKQ cache)
  const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
  const currentFilter = useAppSelector(selectCurrentFilter);
  const selectFilteredTasks = useCallback(
    createSelectFilteredTasksGroupedByDate(),
    []
  );
  const selectAllTasksSortedByPosition = useCallback(
    createSelectAllTasksSortedByPosition(),
    []
  );
  const {
    filteredTasks,
    allTasksSortedByPosition,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetTasksByTaskListIdQuery(
    {
      taskListId: `${activeTaskGroupId}`,
    },
    {
      selectFromResult: (result) => ({
        ...result,
        // @ts-ignore
        filteredTasks: selectFilteredTasks(result, currentFilter),
        // @ts-ignore
        allTasksSortedByPosition: selectAllTasksSortedByPosition(result),
      }),
    }
  );

  // Clear active task if user clicks not in TaskList
  const wrapperRef = useRef(null);
  useOutsideActiveTaskClearer(wrapperRef);

  // Hooks for task positions changing
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
    const { draggableId: taskId, source, destination } = result;

    // If user dropped task not in the droppable zone
    if (!destination) return;

    // If nothing changed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const newDueDate = destination.droppableId;
    const newIndex = destination.index;

    // Find array of tasks for destination date group
    let destinationDateGroupTasks = filteredTasks.filter(
      (dateGroup) => dateGroup.date === newDueDate
    )?.[0]?.tasks;
    if (!destinationDateGroupTasks) return;

    // Find prevTaskId in terms of Google Task positions
    let prevTaskId: string | null = null;

    // If user moved task to the first position in the date group (doesn't matter new or the same date group)
    if (newIndex === 0) {
      const nextTaskId = destinationDateGroupTasks[0].id; // we can only take the next task from the list
      const nextTaskIndex = allTasksSortedByPosition.findIndex(
        // and then find the corresponding previous task in Google
        (task) => task.id === nextTaskId
      );
      prevTaskId =
        nextTaskIndex > 0
          ? allTasksSortedByPosition[nextTaskIndex - 1].id
          : null;
    }

    // If we move task to another date group
    if (destination.droppableId !== source.droppableId && newIndex > 0) {
      prevTaskId = destinationDateGroupTasks[newIndex - 1].id;
    }

    // If we move task inside the same date group
    if (destination.droppableId === source.droppableId && newIndex > 0) {
      const newDateGroupTasks = Array.from(destinationDateGroupTasks);
      newDateGroupTasks.splice(source.index, 1);
      prevTaskId = newDateGroupTasks[newIndex - 1].id;
    }

    // Update due date for the task if user moved it to another date group
    if (destination.droppableId !== source.droppableId)
      asyncEditTaskDateHandling(taskId, newDueDate);
    // Move task to the new position
    asyncChangingTaskPositionHandling(taskId, prevTaskId);
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
    prevTaskId: string | null
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
