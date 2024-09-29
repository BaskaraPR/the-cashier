"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  searchTerm: string;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: () => void;
}

export default function SearchInput({
  searchTerm,
  handleSearchChange,
  handleSearch,
}: SearchInputProps) {
  return (
    <div className="relative w-96">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search..."
        className="block w-full px-4 py-2 pl-10 rounded-md border-2 border-tertiary shadow-sm"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="text-secondary h-5 w-5" />
      </div>
      <button
        onClick={handleSearch}
        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-1 rounded-md border-2 button-transition"
      >
        Search
      </button>
    </div>
  );
}
