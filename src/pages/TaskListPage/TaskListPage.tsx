import React from "react";
import styles from "./TaskListPage.module.css";
import { TaskGroupsList } from "../../features/taskGroupsList/TaskGroupList/TaskGroupsList";
import { TaskListPanel } from "../../features/taskList/TaskListPanel/TaskListPanel";

export const TaskListPage = () => {
  return (
    <main className={styles.root}>
      <div className="container">
        <div className={styles.taskListPageContent}>
          <div className={styles.sideBar}>
            <TaskGroupsList />
          </div>
          <div className={styles.mainContent}>
            <TaskListPanel />
          </div>
        </div>
      </div>
    </main>
  );
};
