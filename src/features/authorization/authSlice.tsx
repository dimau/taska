import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IAuthState {
  accessToken: string;
  expirationTimeStamp: string;
}

let initialState: IAuthState = {
  accessToken: "",
  expirationTimeStamp: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addGoogleAuth: (state, action: PayloadAction<IAuthState>) => action.payload,
  },
});

export const authReducer = authSlice.reducer;
export const authActions = { ...authSlice.actions };

/*********************************************/
/* Selector functions for slice state        */
/*********************************************/

export function selectAuth(state: RootState) {
  return state.auth;
}

export function selectAuthAccessToken(state: RootState) {
  return selectAuth(state).accessToken;
}

export function selectIsAuthTokenNotExpired(state: RootState) {
  return Date.now() < +selectAuth(state).expirationTimeStamp;
}
