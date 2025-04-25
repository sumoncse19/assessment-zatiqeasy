"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import useSWR from "swr";
import { ProductListResponse, SearchParams, SortColumn, SortOrder } from "../types";
import { fetchProducts, buildProductsUrl } from "@/lib/api";

export function useProductList() {
  const hasInitiatedSearch = useRef(false);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  
  // Create a memoized URL using the utility function
  const url = useMemo(() => buildProductsUrl(searchParams), [searchParams]);
  
  // Fetch data using SWR with our API fetcher
  const { data, error, isLoading, mutate } = useSWR<ProductListResponse | null>(
    url,
    fetchProducts,
    {
      revalidateOnFocus: false,
      dedupingInterval: 10000,
      shouldRetryOnError: true,
      errorRetryCount: 3,
    }
  );
  
  // Create memoized pagination data
  const pagination = useMemo(() => {
    if (!data) return null;
    
    return {
      currentPage: data.current_page,
      lastPage: data.last_page,
      from: data.from,
      to: data.to,
      total: data.total,
      perPage: data.per_page
    };
  }, [data]);
  
  // Memoize products data
  const products = useMemo(() => data?.data || [], [data]);
  
  // Initialize search with default parameters
  const initializeSearch = useCallback(() => {
    if (!hasInitiatedSearch.current) {
      setSearchParams({ 
        page: 1,
        sort_by: 'id' as SortColumn,
        order: 'desc' as SortOrder
      });
      hasInitiatedSearch.current = true;
    }
  }, []);
  
  const handleSearch = useCallback((term: string) => {
    if (!hasInitiatedSearch.current) {
      hasInitiatedSearch.current = true;
    }
    
    setSearchParams(prev => ({
      ...(prev || {}),
      search: term,
      page: 1
    }));
  }, []);
  
  const handleSort = useCallback((column: SortColumn, order: SortOrder) => {
    if (!hasInitiatedSearch.current) {
      hasInitiatedSearch.current = true;
    }
    
    setSearchParams(prev => ({
      ...(prev || {}),
      sort_by: column,
      order: order,
      page: 1
    }));
  }, []);
  
  const handlePageChange = useCallback((page: number) => {
    if (!hasInitiatedSearch.current) {
      hasInitiatedSearch.current = true;
    }
    
    setSearchParams(prev => ({
      ...(prev || {}),
      page
    }));
  }, []);
  
  return {
    products,
    pagination,
    searchParams: searchParams || {},
    isLoading,
    error,
    handleSearch,
    handleSort,
    handlePageChange,
    initializeSearch,
    refresh: mutate
  };
} 