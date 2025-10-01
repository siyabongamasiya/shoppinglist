import React, { useState } from "react";

interface FilterBarProps {
  onFilterChange(newValue: string): void;
  categories: string[];
  category: string;
}

const FilterBar = ({
  onFilterChange,
  categories,
  category,
}: FilterBarProps) => {
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange(value);
  };

  return (
    <div id="filter-container">
      <select value={category} onChange={handleCategoryChange}>
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

