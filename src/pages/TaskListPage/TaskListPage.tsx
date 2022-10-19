import React from "react";
import NewTask from "../../features/newTask/NewTask/NewTask";
import TaskList from "../../features/taskList/TaskList/TaskList";
import Filter from "../../features/filter/Filter/Filter";
import styles from "./TaskListPage.module.css";
import { TasksListHeader } from "../../components/TasksListHeader/TasksListHeader";

const TaskListPage = () => {
  return (
    <main className={styles.root}>
      <div className="container">
        <div className={styles.taskListPageContent}>
          <TasksListHeader />
          <NewTask />
          <TaskList />
          <Filter />
        </div>
      </div>
    </main>
  );
};

export default TaskListPage;
