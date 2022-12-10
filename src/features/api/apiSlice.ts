import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import { IGoogleTaskListResponse, IGoogleTaskResponse } from "./interfaces";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tasks.googleapis.com/tasks/v1/",
    prepareHeaders: (headers, { getState }) => {
      const authToken = (getState() as RootState).auth.accessToken;
      if (authToken) headers.set("Authorization", `Bearer ${authToken}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Getting all tasks lists from Google Tasks
    getTasksLists: builder.query<IGoogleTaskListResponse, any>({
      query: () => ({ url: `users/@me/lists`, method: "GET" }),
    }),

    // Getting all tasks from specific task list from Google Tasks
    getTasksByTaskListId: builder.query<
      IGoogleTaskResponse,
      { taskListId: string }
    >({
      query: ({ taskListId }) => ({
        url: `lists/${taskListId}/tasks`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTasksListsQuery, useGetTasksByTaskListIdQuery } = apiSlice;
