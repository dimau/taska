export interface ITask {
  taskId: string;
  title: string;
  isDone: boolean;
}

export interface ITaskGroup {
  id: string;
  title: string;
}

export interface ITaskGroupEntities {
  [id: string]: ITaskGroup;
}
