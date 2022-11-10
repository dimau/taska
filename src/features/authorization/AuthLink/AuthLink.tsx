import React, { useState } from "react";
import { Modal } from "../../../components/Modal/Modal";
import { Button } from "../../../components/Button/Button";
import { ButtonLink } from "../../../components/ButtonLink/ButtonLink";
import styles from "./AuthLink.module.css";

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
            <ButtonLink size="middle" text="Authorize by Google" href="/" />
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
