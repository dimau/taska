import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NewTask } from "./NewTask";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import userEvent from "@testing-library/user-event";
import * as apiSlice from "../../api/apiSlice";

describe("NewTask component", () => {
  test("Rendering NewTask component and focus on it", () => {
    render(
      <Provider store={store}>
        <NewTask />
      </Provider>
    );

    expect(screen.getByPlaceholderText(/add new task/i)).toHaveFocus();
  });

  test("Show typed text in new task field", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <NewTask />
      </Provider>
    );

    await user.type(
      screen.getByPlaceholderText(/add new task/i),
      "To buy a new car"
    );

    expect(screen.getByRole("textbox")).toHaveDisplayValue("To buy a new car");

    await userEvent.clear(screen.getByRole("textbox"));
  });

  test("Submit correct new task", async () => {
    const user = userEvent.setup();

    // Mock for the hook that used inside NewTask module to handle submit
    const addNewTaskMock = jest.fn();
    jest
      .spyOn(apiSlice, "useCreateTaskMutation")
      .mockReturnValue([addNewTaskMock, { isLoading: false, reset: () => {} }]);

    render(
      <Provider store={store}>
        <NewTask />
      </Provider>
    );

    await user.type(
      screen.getByPlaceholderText(/add new task/i),
      "To buy milk"
    );
    await user.type(screen.getByRole("textbox"), "{enter}");

    expect(addNewTaskMock).toHaveBeenCalledTimes(1);
    expect(addNewTaskMock).toHaveBeenCalledWith({
      taskList: "",
      title: "To buy milk",
    });
    //expect(screen.getByRole("textbox")).toHaveDisplayValue("");

    await userEvent.clear(screen.getByRole("textbox"));
  });

  test("Try submit an empty new task", async () => {
    const user = userEvent.setup();

    // Mock for the hook that used inside NewTask module to handle submit
    const addNewTaskMock = jest.fn();
    jest
      .spyOn(apiSlice, "useCreateTaskMutation")
      .mockReturnValue([addNewTaskMock, { isLoading: false, reset: () => {} }]);

    render(
      <Provider store={store}>
        <NewTask />
      </Provider>
    );

    await user.type(screen.getByPlaceholderText(/add new task/i), "  ");
    await user.type(screen.getByRole("textbox"), "{enter}");

    expect(addNewTaskMock).toHaveBeenCalledTimes(0);
  });
});
