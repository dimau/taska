// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";

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

// Define our single API slice object
export const apiSlice = createApi({
  // The cache reducer expects to be added at `state.api` (already default - this is optional)
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // All of our requests will have URLs starting with baseUrl
    baseUrl: "https://tasks.googleapis.com/tasks/v1/users/@me/",
    prepareHeaders: (headers, { getState }) => {
      const authToken = (getState() as RootState).auth.accessToken;
      if (authToken) headers.set("Authorization", `Bearer ${authToken}`);
      return headers;
    },
  }),
  // The "endpoints" represent operations and requests for this server
  endpoints: (builder) => ({
    getTasksLists: builder.query<IResponse, any>({
      // The URL for the request is 'https://tasks.googleapis.com/tasks/v1/users/@me/lists'
      query: () => ({ url: `lists`, method: "GET" }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTasksListsQuery } = apiSlice;
