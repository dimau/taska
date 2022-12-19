import React from "react";
import { TasksListHeader } from "../../../components/TasksListHeader/TasksListHeader";
import { NewTask } from "../../newTask/NewTask/NewTask";
import { TaskList } from "../TaskList/TaskList";
import { Filter } from "../../filter/Filter/Filter";
import styles from "./TaskListPanel.module.css";

export function TaskListPanel() {
  return (
    <div className={styles.root}>
      <TasksListHeader />
      <NewTask />
      <TaskList />
      <Filter />
    </div>
  );
}
