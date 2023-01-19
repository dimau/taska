import React from "react";
import styles from "./Filter.module.css";
import { FilterButton } from "../FilterButton/FilterButton";

export function Filter() {
  return (
    <div className={styles.filter}>
      <FilterButton value="filter-all" label="All" />
      <FilterButton value="filter-active" label="Active" />
      <FilterButton value="filter-completed" label="Completed" />
    </div>
  );
}
