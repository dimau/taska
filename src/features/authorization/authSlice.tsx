import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

export interface IAuthState {
  googleUserName: string;
  accessToken: string;
}

let initialState: IAuthState = {
  googleUserName: "",
  accessToken: "",
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
