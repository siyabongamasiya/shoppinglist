import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="flex items-center border rounded-lg px-3 py-2 w-full max-w-md shadow-sm">
      <FaSearch className="text-gray-500 mr-2" />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search lists..."
        className="flex-1 outline-none bg-transparent text-gray-700 placeholder-gray-400"
      />
    </div>
  );
}
