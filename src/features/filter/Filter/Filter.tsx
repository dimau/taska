import React from "react";
import styles from "./Filter.module.css";
import FilterButton from "../FilterButton/FilterButton";
import { filterSliceActions, selectCurrentFilter } from "../filterSlice";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";

function Filter() {
  const selectedFilter = useAppSelector(selectCurrentFilter);
  const dispatch = useAppDispatch();

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(filterSliceActions.changeCurrentFilter(e.target.value));
  };

  return (
    <div className={styles.filter} onChange={handleChange}>
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
