import React, { useEffect } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { taskListActions } from "../taskListSlice";

export function useOutsideActiveTaskClearer(
  ref: React.MutableRefObject<HTMLDivElement | null>
) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Click-handler outside tasks list
    function handleClickOutside(event: React.MouseEvent<Element, MouseEvent>) {
      if (
        ref.current &&
        !ref.current.contains(event.target as HTMLElement) &&
        (event.target as HTMLElement).isConnected // We need this additional check because label element of task title disappear after click
      ) {
        dispatch(taskListActions.clearActiveTask());
      }
    }

    // Bind the event listener
    // @ts-ignore
    document.addEventListener("click", handleClickOutside);

    // Unbind the event listener on clean up
    return () => {
      // @ts-ignore
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);
}
