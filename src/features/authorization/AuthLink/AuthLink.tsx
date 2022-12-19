import React from "react";
import { ButtonLink } from "../../../components/ButtonLink/ButtonLink";
import { ACCESS_TOKEN_URI } from "../accessToken";
import {
  useGetTokenInfoQuery,
  useGetUserInfoQuery,
} from "../../api/apiGoogleAuthSlice";
import { useAppSelector } from "../../../app/hooks";
import { selectAuthAccessToken } from "../authSlice";
import styles from "./AuthLink.module.css";

export function AuthLink() {
  // Check status for current Google access token if we have such in Store
  const accessToken = useAppSelector(selectAuthAccessToken);
  const { data: accessTokenInfo, isFetching } = useGetTokenInfoQuery({
    accessToken,
  });

  // Get user name and picture, if he is authorized
  const { data: userInfo } = useGetUserInfoQuery(undefined);

  // If user is already authorized proper way
  if (
    accessToken !== "" &&
    (accessTokenInfo?.expires_in || isFetching) &&
    userInfo
  ) {
    return (
      <div className={styles.root}>
        <img src={userInfo.picture} alt="avatar" className={styles.picture} />
        {userInfo.name}
      </div>
    );
  }

  // If user is not authorized yet
  return (
    <ButtonLink
      href={ACCESS_TOKEN_URI}
      size="small"
      text="Log In"
      type="external"
    />
  );
}
