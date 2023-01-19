import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { IGoogleTaskDescription } from "../../../interfaces";
import { TaskCheckbox } from "./TaskCheckbox";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import * as apiSlice from "../../api/apiSlice";

const taskInfoNeedsAction: IGoogleTaskDescription = {
  due: "2022-12-06T00:00:00.000Z",
  etag: '"LTg2NjI2MDI4NQ"',
  id: "NXh1d0pEZkZqUWxkSmlZbw",
  kind: "tasks#task",
  links: [],
  notes: "Each day to solve some problems",
  position: "00000000000000000008",
  selfLink: "",
  status: "needsAction",
  title: "Check that this task is working",
  updated: "2022-12-05T10:29:06.000Z",
};

const taskInfoCompleted: IGoogleTaskDescription = {
  due: "2022-12-06T00:00:00.000Z",
  etag: '"LTg2NjI2MDI4NQ"',
  id: "NXh1d0pEZkZqUWxkSmlZbw",
  kind: "tasks#task",
  links: [],
  notes: "Each day to solve some problems",
  position: "00000000000000000008",
  selfLink: "",
  status: "completed",
  title: "Check that this task is working",
  updated: "2022-12-05T10:29:06.000Z",
};

describe("Task Checkbox component", () => {
  test("Check unchecked state rendering", () => {
    render(
      <Provider store={store}>
        <TaskCheckbox taskInfo={taskInfoNeedsAction} />
      </Provider>
    );

    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  test("Check checked state rendering", () => {
    render(
      <Provider store={store}>
        <TaskCheckbox taskInfo={taskInfoCompleted} />
      </Provider>
    );

    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  test("Toggle checkbox", async () => {
    const user = userEvent.setup();

    // Mock for the hook that used inside TaskCheckbox module to handle submit
    const toggleTaskMock = jest.fn();
    jest
      .spyOn(apiSlice, "useToggleTaskStatusMutation")
      .mockReturnValue([toggleTaskMock, { isLoading: false, reset: () => {} }]);

    render(
      <Provider store={store}>
        <TaskCheckbox taskInfo={taskInfoNeedsAction} />
      </Provider>
    );

    await user.click(screen.getByRole("checkbox"));

    expect(toggleTaskMock).toHaveBeenCalledTimes(1);
    expect(toggleTaskMock).toHaveBeenCalledWith({
      newStatus: "completed",
      taskListId: "",
      taskId: "NXh1d0pEZkZqUWxkSmlZbw",
    });
  });
});
