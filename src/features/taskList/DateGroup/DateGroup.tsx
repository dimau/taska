// import React, { useMemo } from "react";
// import Task from "../Task/Task";
// import { IEndpointSubSlice, IGoogleTaskDescription } from "../../../interfaces";
// import { useGetTasksByTaskListIdQuery } from "../../api/apiSlice";
// import { useAppSelector } from "../../../app/hooks";
// import { selectActiveTaskGroupId } from "../../taskGroupsList/taskGroupListSlice";
// import { createSelector } from "@reduxjs/toolkit";
//
// interface IDateGroupProps {
//   date: string;
// }
//
// export function DateGroup({ date }: IDateGroupProps) {
//   const activeTaskGroupId = useAppSelector(selectActiveTaskGroupId);
//
//   const selectTasksForDate = useMemo(() => {
//     // Return a unique selector instance for this date so that
//     // the filtered results are correctly memoized
//     return createSelector(
//       (res: IEndpointSubSlice) => res.data,
//       (res: IEndpointSubSlice, { dueDate }: { dueDate: string }) => dueDate,
//       (data: IGoogleTaskDescription[], dueDate: string) =>
//         data?.filter((task) => task.due === dueDate) ?? []
//     );
//   }, []);
//
//   const tasksForDate = useGetTasksByTaskListIdQuery(
//     { taskListId: activeTaskGroupId },
//     {
//       selectFromResult: (result) => ({
//         tasksForDate: selectTasksForDate(result, { dueDate: date }),
//       }),
//     }
//   );
//
//   return (
//     <div>
//       <div>{date}</div>
//       {tasksForDate.map((task) => (
//         <Task taskInfo={task} key={task.id} />
//       ))}
//     </div>
//   );
// }
