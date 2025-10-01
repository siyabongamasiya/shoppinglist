import React, { useState } from "react";
import "../App.css";


interface FilterBarProps {
  onFilterChange(newValue: string): void;
  categories: string[];
}

const FilterBar = ({
  onFilterChange,
  categories,
}: FilterBarProps) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange(value);
  };

  return (
    <div id="filter-container">
      <select value={"value"} onChange={handleCategoryChange}>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;

