import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { NewTask } from "./NewTask";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import userEvent from "@testing-library/user-event";

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
  });
});
