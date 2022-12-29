import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import {
  IGoogleTaskDescription,
  IGoogleTaskDescriptionPatch,
  IGoogleTaskListResponse,
  IGoogleTaskResponse,
} from "../../interfaces";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tasks.googleapis.com/tasks/v1",
    prepareHeaders: (headers, { getState }) => {
      const authToken = (getState() as RootState).auth.accessToken;
      if (authToken) headers.set("Authorization", `Bearer ${authToken}`);
      return headers;
    },
  }),
  tagTypes: ["Task"],

  endpoints: (builder) => ({
    // Getting all tasks lists from Google Tasks
    getTasksLists: builder.query<IGoogleTaskListResponse, any>({
      query: () => ({ url: `/users/@me/lists`, method: "GET" }),
    }),

    // Getting all tasks from specific task list from Google Tasks
    getTasksByTaskListId: builder.query<
      IGoogleTaskDescription[],
      { taskListId: string }
    >({
      query: ({ taskListId }) => ({
        // I used here additional query parameter &_= new Date().getTime(),
        // it helps as a workaround to get actual data each time, not the cached data
        url: `/lists/${taskListId}/tasks?showCompleted=true&showHidden=true&maxResults=100&_=${new Date().getTime()}`,
        method: "GET",
      }),
      providesTags: ["Task"],
      transformResponse: (response: IGoogleTaskResponse) => response.items,
    }),

    // Creating a new task
    createTask: builder.mutation({
      query: ({ taskList, title }) => ({
        url: `/lists/${taskList}/tasks`,
        method: "POST",
        body: {
          kind: "tasks#task",
          //id: string,
          //etag: string,
          title: title,
          //updated: string,
          //selfLink: string,
          //parent: string,
          //position: string,
          //notes: string,
          status: "needsAction",
          //due: string,
          //completed: string,
          //deleted: false,
          //hidden: boolean,
          //links: [ { type: string, description: string, link: string, }, ],
        },
      }),
      invalidatesTags: ["Task"],
    }),

    // Deleting task
    deleteTask: builder.mutation({
      query: ({ taskList, taskId }) => ({
        url: `/lists/${taskList}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Task"],
      async onQueryStarted({ taskList, taskId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getTasksByTaskListId",
            { taskListId: taskList },
            (draft) => draft.filter((task) => task.id != taskId)
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // Change task (title, description, due date)
    editTask: builder.mutation({
      query: ({ title, description, due, taskListId, taskId }) => {
        const body: IGoogleTaskDescriptionPatch = {
          kind: "tasks#task",
          id: taskId,
        };
        if (title) body.title = title;
        if (description) body.notes = description;
        if (due) body.due = due;
        return {
          url: `/lists/${taskListId}/tasks/${taskId}`,
          method: "PATCH",
          body,
        };
      },
      invalidatesTags: ["Task"],
      async onQueryStarted(
        { title, description, due, taskListId, taskId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getTasksByTaskListId",
            { taskListId },
            (draft) => {
              const task = draft.find((task) => task.id === taskId);
              if (task) {
                if (title) task.title = title;
                if (description) task.notes = description;
                if (due) task.due = due;
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // Change status of the task
    toggleTaskStatus: builder.mutation({
      query: ({ newStatus, taskListId, taskId }) => ({
        url: `/lists/${taskListId}/tasks/${taskId}`,
        method: "PATCH",
        body: {
          kind: "tasks#task",
          id: taskId,
          status: newStatus,
        },
      }),
      invalidatesTags: ["Task"],
      async onQueryStarted(
        { newStatus, taskListId, taskId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getTasksByTaskListId",
            { taskListId },
            (draft) => {
              const task = draft.find((task) => task.id === taskId);
              if (task) {
                task.status =
                  task.status === "completed" ? "needsAction" : "completed";
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),

    // Change task position inside the list
    changeTaskPosition: builder.mutation({
      query: ({ taskListId, taskId, prevTaskId }) => {
        if (prevTaskId)
          return {
            url: `/lists/${taskListId}/tasks/${taskId}/move?previous=${prevTaskId}`,
            method: "POST",
          };
        return {
          // It's the case when we are going to move task in the very beginning of the list (zero position)
          url: `/lists/${taskListId}/tasks/${taskId}/move`,
          method: "POST",
        };
      },
      invalidatesTags: ["Task"],
      async onQueryStarted(
        { taskListId, taskId, prevTaskId },
        { dispatch, queryFulfilled }
      ) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData(
            "getTasksByTaskListId",
            { taskListId },
            (draft) => {
              const task = draft.find((task) => task.id === taskId);
              const prevTask = draft.find((task) => task.id === prevTaskId);
              // Temporarily change position of the task to the right after position of the previous task
              if (task && prevTask) {
                task.position = prevTask.position + "5";
              }
              // It's case when we are going to place task as the very first task of the whole list
              // It works because ascii "/" is less than "0", so this is less then all zero string
              if (task && !prevTask) {
                task.position = "0000000000000000000/";
              }
            }
          )
        );
        try {
          await queryFulfilled;
        } catch {
          patchResult.undo();
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetTasksListsQuery,
  useGetTasksByTaskListIdQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useEditTaskMutation,
  useToggleTaskStatusMutation,
  useChangeTaskPositionMutation,
} = apiSlice;
