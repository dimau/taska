export interface IGoogleTaskListDescription {
  kind: string;
  id: string;
  etag: string;
  title: string;
  updated: string;
  selfLink: string;
}

export interface IGoogleTaskDescription {
  kind: string; // "tasks#task"
  id: string; // "NXh1d0pEZkZqUWxkSmlZbw"
  etag: string; // "\"LTg2NjI2MDI4NQ\""
  title: string; // "Персональное финансовое состояние"
  updated: string; // "2022-12-05T10:29:06.000Z"
  selfLink: string;
  position: string; // "00000000000000000008",
  notes: string; // "Каждый день решать 2 задачки на DSA",
  status: string; // "needsAction",
  due: string; // "2022-12-06T00:00:00.000Z",
  links: string[];
}

export interface IGoogleTaskListResponse {
  kind: string;
  etag: string;
  items: IGoogleTaskListDescription[];
}

export interface IGoogleTaskResponse {
  kind: string; // "tasks#tasks"
  etag: string; // "\"LTQ1ODcxMDI5MA\"",
  nextPageToken: string; // "CgsIkJ3NmwYQmJf5bRoQeExDOEFwdDBZN3JBUjBTeA==",
  items: IGoogleTaskDescription[];
}

export interface IEndpointSubSlice {
  status: string;
  endpointName: string;
  requestId: string;
  originalArgs: string;
  startedTimeStamp: number;
  data: IGoogleTaskDescription[];
  fulfilledTimeStamp: number;
}
