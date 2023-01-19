import React from "react";
import styles from "./FilterButton.module.css";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { filterSliceActions, selectCurrentFilter } from "../filterSlice";

interface FilterButtonProps {
  value: string;
  label: string;
}

export function FilterButton({ value, label }: FilterButtonProps) {
  const selectedFilter = useAppSelector(selectCurrentFilter);
  const dispatch = useAppDispatch();

  const handleChange = function (e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(filterSliceActions.changeCurrentFilter(e.target.value));
  };

  return (
    <label className={styles.filterButton} htmlFor={value}>
      <input
        type="radio"
        className={styles.filterButtonInput}
        id={value}
        name="filter"
        value={value}
        checked={selectedFilter === value}
        onChange={handleChange}
      />
      <div className={styles.filterButtonControl}>{label}</div>
    </label>
  );
}
