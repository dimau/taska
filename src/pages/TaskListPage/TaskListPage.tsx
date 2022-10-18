import React from "react";
import NewTask from "../../features/newTask/NewTask/NewTask";
import TaskList from "../../features/taskList/TaskList/TaskList";
import Filter from "../../features/filter/Filter/Filter";
import styles from "./styles.module.css";
import { TasksListHeader } from "../../components/TasksListHeader/TasksListHeader";

const TaskListPage = () => {
  return (
    <main className={styles.appContainer}>
      <div className={styles.appContainerMainPart}>
        <TasksListHeader />
        <NewTask />
        <TaskList />
      </div>
      <Filter />
    </main>
  );
};

export default TaskListPage;
