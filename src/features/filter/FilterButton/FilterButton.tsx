import React from "react";
import "./FilterButton.css";

interface FilterButtonProps {
  value: string;
  label: string;
  selectedFilter: string;
}

function FilterButton({ value, label, selectedFilter }: FilterButtonProps) {
  return (
    <label className="filter-button" htmlFor={value}>
      <input
        type="radio"
        className="filter-button__input"
        id={value}
        name="filter"
        value={value}
        checked={selectedFilter === value}
        onChange={() => {}} // we will handle this event on the Filter component level, so it's just to remove warning in browser
      />
      <div className="filter-button__control">{label}</div>
    </label>
  );
}

export default FilterButton;
