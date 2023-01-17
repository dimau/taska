import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import * as apiSlice from "../../api/apiSlice";
import { TaskGroupsList } from "./TaskGroupsList";
import { Provider } from "react-redux";
import { store } from "../../../app/store";

describe("Task Group List component", () => {
  test("Success rendering list of groups", () => {
    const data = {
      items: [
        { id: "HFNFJDH858H", title: "First list" },
        { id: "BFNDJDNDH", title: "Second list" },
      ],
    };

    const answer = {
      data: data,
      isLoading: false,
      isSuccess: true,
      isError: false,
      error: undefined,
      refetch: () => {},
    };

    // Mock for the hook that used inside Task Group List module to get data about task groups
    // @ts-ignore
    jest.spyOn(apiSlice, "useGetTasksListsQuery").mockReturnValue(answer);

    render(
      <Provider store={store}>
        <TaskGroupsList />
      </Provider>
    );

    expect(screen.getByText("First list")).toBeInTheDocument();
    expect(screen.getByText("Second list")).toBeInTheDocument();
  });

  test("Show loading status", () => {
    const data = {
      items: [],
    };

    const answer = {
      data: data,
      isLoading: true,
      isSuccess: false,
      isError: false,
      error: undefined,
      refetch: () => {},
    };

    // Mock for the hook that used inside Task Group List module to get data about task groups
    // @ts-ignore
    jest.spyOn(apiSlice, "useGetTasksListsQuery").mockReturnValue(answer);

    render(
      <Provider store={store}>
        <TaskGroupsList />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });
});
