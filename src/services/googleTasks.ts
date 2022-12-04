// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../app/store";

export interface IGoogleTaskListDescription {
  kind: string;
  id: string;
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
}

export interface IResponse {
  kind: string;
  etag: string;
  items: IGoogleTaskListDescription[];
}

// Define a service using a base URL and expected endpoints
export const googleTasksApi = createApi({
  reducerPath: "googleTasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://tasks.googleapis.com/tasks/v1/users/@me/",
    prepareHeaders: (headers, { getState }) => {
      const authToken = (getState() as RootState).auth.accessToken;
      if (authToken) headers.set("Authorization", `Bearer ${authToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllTaskLists: builder.query<IResponse, string>({
      query: () => ({ url: `lists` }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAllTaskListsQuery } = googleTasksApi;
