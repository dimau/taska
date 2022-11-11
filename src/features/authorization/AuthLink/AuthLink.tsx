import React, { useState } from "react";
import { Modal } from "../../../components/Modal/Modal";
import { Button } from "../../../components/Button/Button";
import { ButtonLink } from "../../../components/ButtonLink/ButtonLink";
import styles from "./AuthLink.module.css";

const ACCESS_TOKEN_URI_PARTS = {
  host: "https://accounts.google.com/o/oauth2/v2/auth",
  type: "response_type=token",
  clientId:
    "client_id=1055530683437-2n4cde8v4humjd2rltaq0pgfl72kqdf6.apps.googleusercontent.com",
  redirectUrl: "redirect_uri=https%3A//taska.dimau.ru/access-token",
  scope: "scope=https%3A//www.googleapis.com/auth/tasks+profile", // two scopes, one for google tasks and the second for profile name
};
const ACCESS_TOKEN_URI = `${ACCESS_TOKEN_URI_PARTS.host}?${ACCESS_TOKEN_URI_PARTS.type}&${ACCESS_TOKEN_URI_PARTS.clientId}&${ACCESS_TOKEN_URI_PARTS.redirectUrl}&${ACCESS_TOKEN_URI_PARTS.scope}`;

export function AuthLink() {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <div>
      {modalIsOpen && (
        <Modal title="Authorization" onClose={() => setModalIsOpen(false)}>
          <div className={styles.AuthModalContentContainer}>
            <ButtonLink
              size="middle"
              text="Continue without authorization"
              href="/tasks"
            />
            <a href={ACCESS_TOKEN_URI}>Authorize by Google</a>
          </div>
        </Modal>
      )}

      <Button
        size="small"
        text="Log In"
        onClick={() => {
          setModalIsOpen(true);
        }}
      />
    </div>
  );
}
