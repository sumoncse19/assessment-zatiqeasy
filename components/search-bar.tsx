"use client";

import { useState, useRef, useEffect } from "react";

interface SearchBarProps {
  initialValue?: string;
  onSearch: (term: string) => void;
}

export default function SearchBar({ initialValue = "", onSearch }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialValue);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Update search term when initialValue prop changes
  useEffect(() => {
    setSearchTerm(initialValue);
  }, [initialValue]);

  // Trigger search on component mount if initialValue is not empty
  useEffect(() => {
    if (initialValue) {
      onSearch(initialValue);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set new debounced search
    timeoutRef.current = setTimeout(() => {
      onSearch(value);
    }, 300); // Reduced debounce time for better responsiveness
  };

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          placeholder="Search products..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              onSearch("");
            }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
} 