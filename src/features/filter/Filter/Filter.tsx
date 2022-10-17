import React from "react";
import "./Filter.css";
import FilterButton from "../FilterButton/FilterButton";
import { useDispatch, useSelector } from "react-redux";
import { filterSliceActions, selectCurrentFilter } from "../filterSlice";

function Filter() {
  const selectedFilter = useSelector(selectCurrentFilter);
  const dispatch = useDispatch();

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(filterSliceActions.changeCurrentFilter(e.target.value));
  };

  return (
    <div className="filter" onChange={handleChange}>
      <FilterButton
        value="filter-all"
        label="All"
        selectedFilter={selectedFilter}
      />
      <FilterButton
        value="filter-active"
        label="Active"
        selectedFilter={selectedFilter}
      />
      <FilterButton
        value="filter-completed"
        label="Completed"
        selectedFilter={selectedFilter}
      />
    </div>
  );
}

export default Filter;
