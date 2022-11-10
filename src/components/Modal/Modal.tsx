import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

interface ModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

export function Modal({ children, title, onClose }: ModalProps) {
  return ReactDOM.createPortal(
    <div className={styles.root}>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.window}>
        <div className={styles.header}>
          <div className={styles.title}>{title}</div>
          <div className={styles.cancelIcon} onClick={onClose}>
            X
          </div>
        </div>
        <div className={styles.main}>{children}</div>
      </div>
    </div>,
    document.getElementById("modal-container") as HTMLElement
  );
}
