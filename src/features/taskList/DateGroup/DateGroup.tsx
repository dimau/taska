import React from "react";
import Task from "../Task/Task";
import { IGoogleTaskDescription } from "../../../interfaces";
import { datePrettier } from "../utils";
import styles from "./DateGroup.module.css";

interface IDateGroupProps {
  date: string;
  tasks: IGoogleTaskDescription[];
}

export function DateGroup({ date, tasks }: IDateGroupProps) {
  return (
    <div>
      <div className={styles.date}>{datePrettier(date)}</div>
      {tasks.map((task) => (
        <Task taskInfo={task} key={task.id} />
      ))}
    </div>
  );
}
