import { taskGroupsListActions } from "./taskGroupListSlice";
import { AppThunk } from "../../app/hooks";
import { selectAuth } from "../authorization/authSlice";
import { ITaskGroupEntities } from "../../interfaces";

export const loadTaskGroupsGoogle: AppThunk = (dispatch, getState) => {
  const { accessToken } = selectAuth(getState());
  if (accessToken === "") return; // this is not an authorized Google user (at least we don't have access token)

  fetch("https://tasks.googleapis.com/tasks/v1/users/@me/lists", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => response.json())
    .then((res) => {
      // Extract data for reducer
      let entities: ITaskGroupEntities = {};
      let ids: string[] = [];
      for (let group of res.items) {
        entities[group.id] = {
          id: group.id,
          title: group.title,
        };
        ids.push(group.id);
      }

      dispatch(
        taskGroupsListActions.successLoading({
          entities,
          ids,
        })
      );
    })
    .catch((err) => console.log(err));
};
