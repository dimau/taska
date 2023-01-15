import React from "react";
import { render, screen } from "@testing-library/react";
import { TaskTitle } from "./TaskTitle";
import "@testing-library/jest-dom";
import { IGoogleTaskDescription } from "../../../interfaces";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import userEvent from "@testing-library/user-event";
import * as apiSlice from "../../api/apiSlice";

const taskCorrectInfo: IGoogleTaskDescription = {
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

describe("Task Title component", () => {
  test("Rendering Task Title component by default in not editable state", () => {
    render(
      <Provider store={store}>
        <TaskTitle taskInfo={taskCorrectInfo} toggleActive={() => {}} />
      </Provider>
    );

    expect(
      screen.getByText("Check that this task is working")
    ).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  test("Rendering Task Title component in editable state after click", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <TaskTitle toggleActive={() => {}} taskInfo={taskCorrectInfo} />
      </Provider>
    );

    await user.click(screen.getByText("Check that this task is working"));

    const textBox = screen.getByRole("textbox");
    expect(textBox).toBeInTheDocument();
    expect(textBox).toHaveDisplayValue("Check that this task is working");
    expect(textBox).toHaveFocus();
    expect(screen.queryByText("Check that this task is working")).toBeNull();
  });

  test("User can type a new title and it will be shown", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <TaskTitle toggleActive={() => {}} taskInfo={taskCorrectInfo} />
      </Provider>
    );

    await user.click(screen.getByText("Check that this task is working"));
    const textBox = screen.getByRole("textbox");
    await user.type(textBox, " add something else");

    expect(textBox).toHaveDisplayValue(
      "Check that this task is working add something else"
    );
  });

  test("Task Title component in editable state lose focus after click on another element", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <TaskTitle toggleActive={() => {}} taskInfo={taskCorrectInfo} />
        <div>Just for test</div>
      </Provider>
    );

    await user.click(screen.getByText("Check that this task is working"));
    const textBox = screen.getByRole("textbox");
    await user.type(textBox, " add something else");
    await user.click(screen.getByText("Just for test"));

    // The previous variant of text is in the title
    expect(
      screen.getByText("Check that this task is working")
    ).toBeInTheDocument();
    // Text input is not present
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  test("Submit a correct new title to API", async () => {
    const user = userEvent.setup();

    // Mock for the hook that used inside Task Title module to handle submit
    const editTask = jest.fn();
    jest
      .spyOn(apiSlice, "useEditTaskMutation")
      .mockReturnValue([editTask, { isLoading: false, reset: () => {} }]);

    render(
      <Provider store={store}>
        <TaskTitle toggleActive={() => {}} taskInfo={taskCorrectInfo} />
      </Provider>
    );

    await user.click(screen.getByText("Check that this task is working"));
    const textBox = screen.getByRole("textbox");
    await user.type(textBox, " add something else{enter}");

    expect(editTask).toHaveBeenCalledTimes(1);
    expect(editTask).toHaveBeenCalledWith({
      taskId: "NXh1d0pEZkZqUWxkSmlZbw",
      taskListId: "",
      title: "Check that this task is working add something else",
    });

    // User can see text but not the input
    expect(
      screen.getByText(/Check that this task is working/)
    ).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  test("Don't submit the same text as a title", async () => {
    const user = userEvent.setup();

    // Mock for the hook that used inside Task Title module to handle submit
    const editTask = jest.fn();
    jest
      .spyOn(apiSlice, "useEditTaskMutation")
      .mockReturnValue([editTask, { isLoading: false, reset: () => {} }]);

    render(
      <Provider store={store}>
        <TaskTitle toggleActive={() => {}} taskInfo={taskCorrectInfo} />
      </Provider>
    );

    await user.click(screen.getByText("Check that this task is working"));
    const textBox = screen.getByRole("textbox");
    await user.type(textBox, "{enter}");

    expect(editTask).toHaveBeenCalledTimes(0);

    // User can see text but not the input
    expect(
      screen.getByText(/Check that this task is working/)
    ).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  test("Don't submit the empty text as a title", async () => {
    const user = userEvent.setup();

    // Mock for the hook that used inside Task Title module to handle submit
    const editTask = jest.fn();
    jest
      .spyOn(apiSlice, "useEditTaskMutation")
      .mockReturnValue([editTask, { isLoading: false, reset: () => {} }]);

    render(
      <Provider store={store}>
        <TaskTitle toggleActive={() => {}} taskInfo={taskCorrectInfo} />
      </Provider>
    );

    await user.click(screen.getByText("Check that this task is working"));
    const textBox = screen.getByRole("textbox");
    await userEvent.clear(textBox);
    await user.type(textBox, "{enter}");

    expect(editTask).toHaveBeenCalledTimes(0);

    // User can see text but not the input
    expect(
      screen.getByText(/Check that this task is working/)
    ).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toBeNull();
  });
});
