import React from "react";
import { useAppDispatch } from "../../../app/hooks";
import { authActions } from "../authSlice";
import { Navigate } from "react-router-dom";

// It's component with only one goal - to extract google access token from URL and
// save it to app state (and localhost)
export function GoogleAuthorizer() {
  const dispatch = useAppDispatch();

  // Extract google access token from URL
  const accessToken = window.location.href.match(
    /(?<=access_token=)(.*?)(?=&)/
  )?.[0];

  // TODO: make a nice error message
  if (!accessToken) {
    return (
      <div>
        Ooops, something goes wrong with Google Authorization, please try later
      </div>
    );
  }

  // Save the access token to the app state
  dispatch(authActions.addGoogleAuth({ accessToken: accessToken }));

  // and redirect to the page with user tasks
  return <Navigate to="/tasks" />;
}
