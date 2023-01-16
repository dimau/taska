import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { TasksListHeader } from "./TasksListHeader";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import * as apiSlice from "../../api/apiSlice";
import { taskGroupListActions } from "../../taskGroupsList/taskGroupListSlice";

describe("Task List Header component", () => {
  test("Render TO DO as a task list title by default", () => {
    render(
      <Provider store={store}>
        <TasksListHeader />
      </Provider>
    );

    expect(screen.getByText("TO DO")).toBeInTheDocument();
  });

  test("Render correct task list title", () => {
    const action = taskGroupListActions.changeActiveGroup({
      activeTaskGroupListId: "HFNJS3434NJN",
      activeTaskGroupListTitle: "Another Title",
    });
    store.dispatch(action);

    render(
      <Provider store={store}>
        <TasksListHeader />
      </Provider>
    );

    expect(screen.getByText("Another Title")).toBeInTheDocument();
  });

  test("Render refresh button and call refresh API when clicking", async () => {
    const user = userEvent.setup();

    // Mock for the hook that used inside Task Title module to handle submit
    const refetch = jest.fn();
    jest
      .spyOn(apiSlice, "useGetTasksByTaskListIdQuery")
      .mockReturnValue({ refetch });

    render(
      <Provider store={store}>
        <TasksListHeader />
      </Provider>
    );

    await user.click(screen.getByText("refresh"));

    expect(refetch).toHaveBeenCalledTimes(1);
  });
});
