import React from "react";
import styles from "./FilterButton.module.css";

interface FilterButtonProps {
  value: string;
  label: string;
  selectedFilter: string;
}

function FilterButton({ value, label, selectedFilter }: FilterButtonProps) {
  return (
    <label className={styles.filterButton} htmlFor={value}>
      <input
        type="radio"
        className={styles.filterButtonInput}
        id={value}
        name="filter"
        value={value}
        checked={selectedFilter === value}
        onChange={() => {}} // we will handle this event on the Filter component level, so it's just to remove warning in browser
      />
      <div className={styles.filterButtonControl}>{label}</div>
    </label>
  );
}

export default FilterButton;
