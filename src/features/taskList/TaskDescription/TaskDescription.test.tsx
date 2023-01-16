import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { TaskDescription } from "./TaskDescription";
import { IGoogleTaskDescription } from "../../../interfaces";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
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

describe("Task Description component", () => {
  test("Render task description by default as plain text with no text area", () => {
    render(
      <Provider store={store}>
        <TaskDescription taskInfo={taskCorrectInfo} toggleActive={() => {}} />
      </Provider>
    );

    expect(
      screen.getByText("Each day to solve some problems")
    ).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  test("Rendering Task Description component in editable state after click", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <TaskDescription taskInfo={taskCorrectInfo} toggleActive={() => {}} />
      </Provider>
    );

    await user.click(screen.getByText("Each day to solve some problems"));

    expect(screen.getByRole("textbox")).toHaveFocus();
    expect(screen.getByRole("textbox")).toHaveDisplayValue(
      "Each day to solve some problems"
    );
  });

  test("User can type a new description and it will be shown", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <TaskDescription toggleActive={() => {}} taskInfo={taskCorrectInfo} />
      </Provider>
    );

    await user.click(screen.getByText("Each day to solve some problems"));
    const textBox = screen.getByRole("textbox");
    await user.type(textBox, " add something else");

    expect(textBox).toHaveDisplayValue(
      "Each day to solve some problems add something else"
    );
  });

  test("Task Description component in editable state lose focus after click on another element", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <TaskDescription toggleActive={() => {}} taskInfo={taskCorrectInfo} />
        <div>Just for test</div>
      </Provider>
    );

    await user.click(screen.getByText("Each day to solve some problems"));
    const textBox = screen.getByRole("textbox");
    await user.type(textBox, " add something else");
    await user.click(screen.getByText("Just for test"));

    // The previous variant of text is in the description
    expect(
      screen.getByText("Each day to solve some problems")
    ).toBeInTheDocument();
    // Text input is not present
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  test("Submit a correct new description to API", async () => {
    const user = userEvent.setup();

    // Mock for the hook that used inside Task Description module to handle submit
    const editTask = jest.fn();
    jest
      .spyOn(apiSlice, "useEditTaskMutation")
      .mockReturnValue([editTask, { isLoading: false, reset: () => {} }]);

    render(
      <Provider store={store}>
        <TaskDescription toggleActive={() => {}} taskInfo={taskCorrectInfo} />
      </Provider>
    );

    await user.click(screen.getByText("Each day to solve some problems"));
    const textBox = screen.getByRole("textbox");
    await user.type(textBox, " add something else{enter}");

    expect(editTask).toHaveBeenCalledTimes(1);
    expect(editTask).toHaveBeenCalledWith({
      taskId: "NXh1d0pEZkZqUWxkSmlZbw",
      taskListId: "",
      description: "Each day to solve some problems add something else",
    });

    // User can see text but not the text area
    expect(
      screen.getByText(/Each day to solve some problems/)
    ).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  test("Don't submit the same text as a description", async () => {
    const user = userEvent.setup();

    // Mock for the hook that used inside Task Description module to handle submit
    const editTask = jest.fn();
    jest
      .spyOn(apiSlice, "useEditTaskMutation")
      .mockReturnValue([editTask, { isLoading: false, reset: () => {} }]);

    render(
      <Provider store={store}>
        <TaskDescription toggleActive={() => {}} taskInfo={taskCorrectInfo} />
      </Provider>
    );

    await user.click(screen.getByText("Each day to solve some problems"));
    const textBox = screen.getByRole("textbox");
    await user.type(textBox, "{enter}");

    expect(editTask).toHaveBeenCalledTimes(0);

    // User can see text but not the input
    expect(
      screen.getByText("Each day to solve some problems")
    ).toBeInTheDocument();
    expect(screen.queryByRole("textbox")).toBeNull();
  });

  test("Don't submit a new description if user hold Shift when clicking Enter - just a new string", async () => {
    const user = userEvent.setup();

    // Mock for the hook that used inside Task Description module to handle submit
    const editTask = jest.fn();
    jest
      .spyOn(apiSlice, "useEditTaskMutation")
      .mockReturnValue([editTask, { isLoading: false, reset: () => {} }]);

    render(
      <Provider store={store}>
        <TaskDescription toggleActive={() => {}} taskInfo={taskCorrectInfo} />
      </Provider>
    );

    await user.click(screen.getByText("Each day to solve some problems"));
    const textBox = screen.getByRole("textbox");
    await user.type(textBox, "{Shift>}{enter}{/Shift}");

    expect(editTask).toHaveBeenCalledTimes(0);

    // User can see text area with "\n"
    expect(textBox).toHaveDisplayValue("Each day to solve some problems\n");
  });
});
