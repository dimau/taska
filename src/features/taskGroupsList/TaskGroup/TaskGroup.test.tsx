import React from "react";
import { act, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TaskGroup } from "./TaskGroup";
import userEvent from "@testing-library/user-event";
import { taskGroupListActions } from "../taskGroupListSlice";
import { store } from "../../../app/store";
import { Provider } from "react-redux";

describe("Task Group component", () => {
  test("Render Task Group - is not active", () => {
    render(
      <Provider store={store}>
        <TaskGroup groupId={"YNFHJ383YNHD"} groupTitle={"My favorite tasks"} />
      </Provider>
    );

    expect(screen.getByText("My favorite tasks")).not.toHaveClass("active");
  });

  test("Render Task Group - is active", () => {
    const GROUP_ID = "YNFHJ383YNHD";
    const GROUP_TITLE = "My favorite tasks";

    // Prepare redux store for the test case
    let action = taskGroupListActions.changeActiveGroup({
      activeTaskGroupListId: GROUP_ID,
      activeTaskGroupListTitle: GROUP_TITLE,
    });
    act(() => {
      store.dispatch(action);
    });

    render(
      <Provider store={store}>
        <TaskGroup groupId={GROUP_ID} groupTitle={GROUP_TITLE} />
      </Provider>
    );

    expect(screen.getByText("My favorite tasks")).toHaveClass("active");

    // Clear redux store after test case
    action = taskGroupListActions.changeActiveGroup({
      activeTaskGroupListId: "",
      activeTaskGroupListTitle: "",
    });
    act(() => {
      store.dispatch(action);
    });
  });

  test("Make the Task Group active when user clicks on it", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <TaskGroup groupId={"YNFHJ383YNHD"} groupTitle={"My favorite tasks"} />
      </Provider>
    );

    expect(screen.getByText("My favorite tasks")).not.toHaveClass("active");

    await user.click(screen.getByText("My favorite tasks"));

    expect(screen.getByText("My favorite tasks")).toHaveClass("active");
  });
});
