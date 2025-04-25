"use client";

import { useState, useRef } from "react";
import { SortColumn, SortOrder } from "@/types/index";

interface SortControlProps {
  initialColumn?: SortColumn;
  initialOrder?: SortOrder;
  onSort: (column: SortColumn, order: SortOrder) => void;
}

// Valid columns for sorting
const SORT_COLUMNS: Array<{ value: SortColumn; label: string }> = [
  { value: "name", label: "Name" },
  { value: "buying_price", label: "Buying Price" },
  { value: "selling_price", label: "Selling Price" },
  { value: "stock", label: "Stock" },
  { value: "brand_name", label: "Brand" },
  { value: "category_name", label: "Category" },
  { value: "status", label: "Status" },
];

// Default sort options
const DEFAULT_COLUMN: SortColumn = "id";
const DEFAULT_ORDER: SortOrder = "desc";

export default function SortControl({
  initialColumn = DEFAULT_COLUMN,
  initialOrder = DEFAULT_ORDER,
  onSort,
}: SortControlProps) {
  // Track if this is the initial render
  const isInitialRender = useRef(true);
  
  // State for sort options
  const [sortState, setSortState] = useState({
    column: initialColumn,
    order: initialOrder
  });

  // Handle column change
  const handleColumnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newColumn = e.target.value as SortColumn;
    
    // Update state
    setSortState(prev => {
      const updatedState = {
        ...prev,
        column: newColumn
      };
      
      // Only trigger sort if not the initial render
      if (!isInitialRender.current) {
        onSort(newColumn, updatedState.order);
      } else {
        isInitialRender.current = false;
      }
      
      return updatedState;
    });
  };

  // Handle order change
  const handleOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newOrder = e.target.value as SortOrder;
    
    // Update state
    setSortState(prev => {
      const updatedState = {
        ...prev,
        order: newOrder
      };
      
      // Trigger sort with the new values
      if (!isInitialRender.current) {
        onSort(updatedState.column, newOrder);
      } else {
        isInitialRender.current = false;
      }
      
      return updatedState;
    });
  };

  // Handle reset to default sort
  const handleResetSort = () => {
    // Reset to defaults
    setSortState({
      column: DEFAULT_COLUMN,
      order: DEFAULT_ORDER
    });
    
    // Trigger sort with default values
    onSort(DEFAULT_COLUMN, DEFAULT_ORDER);
    
    // No longer initial render
    isInitialRender.current = false;
  };

  // Check if current sort is different from default
  const isSortModified = sortState.column !== DEFAULT_COLUMN || sortState.order !== DEFAULT_ORDER;

  return (
    <div className="flex flex-col sm:flex-row gap-2 items-start">
      <label className="font-medium">Sort by:</label>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <select
            value={sortState.column}
            onChange={handleColumnChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {SORT_COLUMNS.map((column) => (
              <option key={column.value} value={column.value}>
                {column.label}
              </option>
            ))}
          </select>

          <select
            value={sortState.order}
            onChange={handleOrderChange}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        
        {/* Reset sort button */}
        {isSortModified && (
          <button
            type="button"
            onClick={handleResetSort}
            className="text-sm text-gray-600 hover:text-gray-900 flex items-center self-start"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Sort
          </button>
        )}
      </div>
    </div>
  );
} 