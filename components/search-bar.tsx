"use client";

import { useState, useRef, FormEvent } from "react";

interface SearchBarProps {
  initialValue?: string;
  onSearch: (term: string) => void;
}

export default function SearchBar({ initialValue = "", onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const isInitialRender = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (value.trim() !== "") {
      timeoutRef.current = setTimeout(() => {
        if (!isInitialRender.current) {
          onSearch(value);
        }
      }, 500);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm);
    }
    
    isInitialRender.current = false;
  };

  const handleClearFilter = () => {
    setSearchTerm("");
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    onSearch("");
    isInitialRender.current = false;
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 bg-blue-500 text-white rounded-md"
        >
          Search
        </button>
      </form>
      
    </div>
  );
} 