import React from "react";
import { Task } from "../Task/Task";
import { IGoogleTaskDescription } from "../../../interfaces";
import { datePrettier } from "../utils";
import styles from "./DateGroup.module.css";
import { Droppable } from "react-beautiful-dnd";

interface IDateGroupProps {
  date: string;
  tasks: IGoogleTaskDescription[];
}

export function DateGroup({ date, tasks }: IDateGroupProps) {
  return (
    <Droppable droppableId={date}>
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          <div className={styles.date}>{datePrettier(date)}</div>
          {tasks.map((task, index) => (
            <Task taskInfo={task} index={index} key={task.id} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
}
