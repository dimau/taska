import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import { IGoogleTaskListResponse, IGoogleTaskResponse } from "./interfaces";

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
      IGoogleTaskResponse,
      { taskListId: string }
    >({
      query: ({ taskListId }) => ({
        url: `/lists/${taskListId}/tasks`,
        method: "GET",
      }),
      providesTags: ["Task"],
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
    }),

    // Change status of the task
    toggleTaskStatus: builder.mutation({
      query: ({ newStatus, taskListId, taskId }) => ({
        url: `/lists/${taskListId}/tasks/${taskId}`,
        method: "PATCH",
        body: { status: newStatus },
      }),
      invalidatesTags: ["Task"],
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
  useToggleTaskStatusMutation,
} = apiSlice;
