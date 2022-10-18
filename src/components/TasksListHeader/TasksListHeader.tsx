import React from "react";
import styles from "./styles.module.css";

export function TasksListHeader() {
  return (
    <div className={styles.header}>
      <h1 className={styles.headerTitle}>To do</h1>
    </div>
  );
}