import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { DateGroup } from "./DateGroup";
import { IGoogleTaskDescription } from "../../../interfaces";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import { DragDropContext } from "react-beautiful-dnd";

const taskInfo1: IGoogleTaskDescription = {
  due: "2022-12-05T00:00:00.000Z",
  etag: '"LTg2NjI2MDI4NQ"',
  id: "UNFJDJSndsdfk3Ufnd",
  kind: "tasks#task",
  links: [],
  notes: "taskInfo 1 notes",
  position: "00000000000000000008",
  selfLink: "",
  status: "needsAction",
  title: "taskInfo 1 title",
  updated: "2022-12-04T10:29:06.000Z",
};

const taskInfo2: IGoogleTaskDescription = {
  due: "2022-12-05T04:00:00.000Z",
  etag: '"LTg2NjI2MDI4NQ"',
  id: "NXh1d0pEZkZqUWxkSmlZbw",
  kind: "tasks#task",
  links: [],
  notes: "taskInfo 2 notes",
  position: "00000000000000000009",
  selfLink: "",
  status: "needsAction",
  title: "taskInfo 2 title",
  updated: "2022-12-01T10:29:06.000Z",
};

const taskInfo3: IGoogleTaskDescription = {
  due: "2022-12-06T00:00:00.000Z",
  etag: '"LTg2NjI2MDI4NQ"',
  id: "YndfdO445nJdfndfdfk",
  kind: "tasks#task",
  links: [],
  notes: "taskInfo 3 notes",
  position: "00000000000000000018",
  selfLink: "",
  status: "needsAction",
  title: "taskInfo 3 title",
  updated: "2022-11-05T10:29:06.000Z",
};

const tasksArray = [taskInfo1, taskInfo2, taskInfo3];

describe("Date Group component", () => {
  test("Rendering all tasks from the given list", () => {
    render(
      <DragDropContext onDragEnd={() => {}}>
        <Provider store={store}>
          <DateGroup date={"2022-12-05T10:29:06.000Z"} tasks={tasksArray} />
        </Provider>
      </DragDropContext>
    );

    expect(screen.getByText("taskInfo 1 title")).toBeInTheDocument();
    expect(screen.getByText("taskInfo 2 title")).toBeInTheDocument();
    expect(screen.getByText("taskInfo 3 title")).toBeInTheDocument();
  });

  test("Rendering title with the given date", () => {
    render(
      <DragDropContext onDragEnd={() => {}}>
        <Provider store={store}>
          <DateGroup date={"2022-12-05T10:29:06.000Z"} tasks={tasksArray} />
        </Provider>
      </DragDropContext>
    );

    expect(screen.getByText(/5 декабря 2022/)).toBeInTheDocument();
  });
});
