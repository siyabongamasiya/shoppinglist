import { Plus, Search } from "lucide-react";
import "../styles/components/search-controls.css";

export type SortBy = "name" | "category" | "date";

export type Props = {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortBy: SortBy;
  setSortBy: (s: SortBy) => void;
  onAddClick: () => void;
};

export function SearchControls({
  searchQuery,
  setSearchQuery,
  sortBy,
  setSortBy,
  onAddClick,
}: Props) {
  return (
    <div className="home-controls">
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="search"
          placeholder="Search lists..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="select-container">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortBy)}
          className="form-input"
        >
          <option value="date">Date Created</option>
          <option value="name">Name</option>
          <option value="category">Category</option>
        </select>
      </div>

      <button onClick={onAddClick} className="btn">
        <Plus />
        Add New List
      </button>
    </div>
  );
}
