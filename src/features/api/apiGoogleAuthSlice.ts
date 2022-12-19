import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../../app/store";
import { IAccessTokenInfoResponse, IUserNameResponse } from "../../interfaces";

export const apiGoogleAuthSlice = createApi({
  reducerPath: "apiGoogleAuth",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://www.googleapis.com/oauth2/v1",
    prepareHeaders: (headers, { getState }) => {
      const authToken = (getState() as RootState).auth.accessToken; // TODO: use selector
      if (authToken) headers.set("Authorization", `Bearer ${authToken}`);
      return headers;
    },
  }),

  endpoints: (builder) => ({
    // Getting user's name
    getUserInfo: builder.query<IUserNameResponse, any>({
      query: () => ({
        url: `/userinfo`,
        method: "GET",
      }),
    }),

    // Check access token
    getTokenInfo: builder.query<IAccessTokenInfoResponse, any>({
      query: ({ accessToken }) => ({
        url: `/tokeninfo?access_token=${accessToken}`,
        method: "GET",
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserInfoQuery, useGetTokenInfoQuery } = apiGoogleAuthSlice;
