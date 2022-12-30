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

export interface IGoogleTaskDescriptionPatch {
  kind: string; // "tasks#task"
  id: string; // "NXh1d0pEZkZqUWxkSmlZbw"
  etag?: string; // "\"LTg2NjI2MDI4NQ\""
  title?: string; // "Персональное финансовое состояние"
  updated?: string; // "2022-12-05T10:29:06.000Z"
  selfLink?: string;
  position?: string; // "00000000000000000008",
  notes?: string; // "Каждый день решать 2 задачки на DSA",
  status?: string; // "needsAction",
  due?: string; // "2022-12-06T00:00:00.000Z",
  links?: string[];
}

export interface IEditTaskParams {
  title?: string;
  description?: string;
  due?: string;
  taskListId: string;
  taskId: string;
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

export interface IAccessTokenInfoResponse {
  issued_to: string; // "1059530583430-2n6cde8v4humjd4rltaq0pgfl72kqdf6.apps.googleusercontent.com",
  audience: string; // "1055530633437-2n4cde8v4humjd2rlttq0pgfl72kqdf6.apps.googleusercontent.com",
  user_id: string; // "108521228071206658397",
  scope: string; // "https://www.googleapis.com/auth/tasks https://www.googleapis.com/auth/userinfo.profile",
  expires_in: number; //3522,
  access_type: string; // "online"
}

export interface IUserNameResponse {
  id: string; // "105521878021276158997",
  name: string; // "Дмитрий Ушаков",
  given_name: string; // "Дмитрий",
  family_name: string; //"Ушаков",
  picture: string; // "https://lh3.googleusercontent.com/a/AEdFTp4Hxj29kODkd5ran6mEVkJxijfAONpISGqkr6taLhk=s96-c",
  locale: string; // "ru";
}
