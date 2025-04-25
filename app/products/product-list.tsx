"use client";

import { useState, useCallback, memo, useEffect } from "react";
import { useProductList } from "../../hooks/use-product-list";
import SearchBar from "@/components/search-bar";
import Pagination from "@/components/pagination";
import SortControl from "@/components/sort-control";
import ProductTable from "@/components/product-table";


// Create memoized versions of UI components
const MemoizedSearchBar = memo(SearchBar);
const MemoizedSortControl = memo(SortControl);
const MemoizedPagination = memo(Pagination);

function ProductList() {
  const {
    products,
    pagination,
    searchParams,
    isLoading,
    error,
    handleSearch,
    handleSort,
    handlePageChange,
    initializeSearch,
    resetFilters,
    refresh
  } = useProductList();

  // Auto-initialize data on mount
  useEffect(() => {
    initializeSearch();
  }, [initializeSearch]);

  // Check if filters are applied
  const hasFilters = !!searchParams.search || searchParams.sort_by !== 'id' || searchParams.order !== 'desc';
  const hasSearch = !!searchParams.search;
  const hasCustomSort = searchParams.sort_by !== 'id' || searchParams.order !== 'desc';

  // Function to clear all filters
  const handleClearAllFilters = useCallback(() => {
    // Use the dedicated reset function
    resetFilters();
    handleSearch("");
    handleSort("id", "desc");
    handlePageChange(1);
  }, [resetFilters, handleSearch, handleSort, handlePageChange]);

  // Function to clear just the search
  const handleClearSearch = useCallback(() => {
    handleSearch("");
  }, [handleSearch]);

  // Function to reset just the sort
  const handleResetSort = useCallback(() => {
    handleSort("id", "desc");
  }, [handleSort]);

  return (
    <div className="flex flex-col gap-6">
      {/* Error message */}
      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-md">
          <h3 className="font-bold">Error loading products:</h3>
          <p>{error.message}</p>
          <p className="mt-2 text-sm">
            Please try refreshing the page. If the problem persists, the API might be temporarily unavailable.
          </p>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <MemoizedSearchBar
            initialValue={searchParams.search || ""}
            onSearch={handleSearch}
          />
          <MemoizedSortControl
            initialColumn={searchParams.sort_by}
            initialOrder={searchParams.order}
            onSort={handleSort}
          />
        </div>

        {/* Filter reset buttons */}
        {hasFilters && (
          <div className="flex justify-end gap-2">
            {hasSearch && (
              <button
                onClick={handleClearSearch}
                className="flex items-center text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md border border-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Search
              </button>
            )}
            
            {hasCustomSort && (
              <button
                onClick={handleResetSort}
                className="flex items-center text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md border border-gray-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Sort
              </button>
            )}
            
            <button
              onClick={handleClearAllFilters}
              className="flex items-center text-sm px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md border border-gray-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Reset All
            </button>
          </div>
        )}
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent"></div>
          <p className="mt-2 text-gray-600">Loading products from LaravelPoint.com API...</p>
        </div>
      )}

      {/* Products table */}
      {!isLoading && products.length > 0 && (
        <>
          {/* Status information */}
          {pagination && (
            <div className="text-sm text-gray-600">
              Showing {pagination.from || 0} to {pagination.to || 0} of{" "}
              {pagination.total} results
            </div>
          )}

          {/* Table */}
          <ProductTable
            products={products}
            onSort={handleSort}
            sortColumn={searchParams.sort_by}
            sortOrder={searchParams.order}
          />

          {/* Pagination */}
          {pagination && pagination.lastPage > 1 && (
            <MemoizedPagination
              currentPage={pagination.currentPage}
              totalPages={pagination.lastPage}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
      
      {/* Empty results */}
      {!isLoading && products.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No products found. Try adjusting your search.</p>
        </div>
      )}
    </div>
  );
}

export default memo(ProductList); 