import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import { FilterButton } from "./FilterButton";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import exp from "constants";

describe("Filter Button component", () => {
  test("Render checked Active button by default", () => {
    render(
      <Provider store={store}>
        <FilterButton value={"filter-active"} label={"Active"} />
      </Provider>
    );

    expect(screen.getByRole("radio")).toBeChecked();
  });

  test("Render unchecked button", () => {
    render(
      <Provider store={store}>
        <FilterButton value={"filter-all"} label={"All"} />
      </Provider>
    );

    expect(screen.getByRole("radio")).not.toBeChecked();
  });

  test("Choose filter button", async () => {
    const user = userEvent.setup();

    render(
      <Provider store={store}>
        <FilterButton value={"filter-all"} label={"All"} />
      </Provider>
    );

    const filterButton = screen.getByRole("radio");

    expect(filterButton).not.toBeChecked();
    await user.click(filterButton);
    expect(filterButton).toBeChecked();
  });
});
