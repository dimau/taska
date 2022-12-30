import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  title: React.ReactNode;
  onClose: () => void;
}

export function Modal({ children, title, onClose }: ModalProps) {
  return ReactDOM.createPortal(
    <div className={styles.root}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.window}>
        <span
          className={`material-symbols-outlined ${styles.cancelIcon}`}
          onClick={onClose}
        >
          close
        </span>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
        </div>
        <div className={styles.main}>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-container") as HTMLElement
  );
}
