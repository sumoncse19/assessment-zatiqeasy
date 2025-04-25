"use client";

import { useMemo, useCallback } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  // Generate page numbers to display (memoized)
  const pageNumbers = useMemo(() => {
    const numbers: (number | string)[] = [];
    
    // Always show first page
    numbers.push(1);
    
    // Calculate range around current page
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      numbers.push("...");
    }
    
    // Add pages around current page
    for (let i = startPage; i <= endPage; i++) {
      numbers.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      numbers.push("...");
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      numbers.push(totalPages);
    }
    
    return numbers;
  }, [currentPage, totalPages]);

  // Handle page change (memoized)
  const handlePageClick = useCallback((page: number) => {
    if (page !== currentPage) {
      onPageChange(page);
    }
  }, [currentPage, onPageChange]);

  // No pagination if only one page
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex justify-center mt-6">
      <nav className="flex items-center gap-1">
        {/* Previous button */}
        <button
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md ${
            currentPage === 1
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          Previous
        </button>
        
        {/* Page numbers */}
        {pageNumbers.map((page, index) => (
          typeof page === "number" ? (
            <button
              key={index}
              onClick={() => handlePageClick(page)}
              className={`px-3 py-1 rounded-md ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              {page}
            </button>
          ) : (
            <span key={index} className="px-2">
              {page}
            </span>
          )
        ))}
        
        {/* Next button */}
        <button
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
          }`}
        >
          Next
        </button>
      </nav>
    </div>
  );
} 