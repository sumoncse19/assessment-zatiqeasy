"use client";

import { useState, useCallback, useRef, useMemo } from "react";
import useSWR from "swr";
import { ProductListResponse, SearchParams, SortColumn, SortOrder } from "../types";

// Direct API URL
const API_URL = "https://captainbinary.com/api/ProductList";

// Fetcher function for SWR
const fetcher = async (url: string | null) => {
  if (!url) return null;
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  });
  
  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }
  
  return response.json() as Promise<ProductListResponse>;
};

// Build URL with search parameters
const buildUrl = (params: SearchParams | null) => {
  if (params === null) return null;
  
  const searchParams = new URLSearchParams();
  
  if (params.search) {
    searchParams.append("search", params.search);
  }
  
  if (params.sort_by) {
    searchParams.append("sort_by", params.sort_by);
  }
  
  if (params.order) {
    searchParams.append("order", params.order);
  }
  
  if (params.page) {
    searchParams.append("page", params.page.toString());
  }
  
  const queryString = searchParams.toString();
  return queryString ? `${API_URL}?${queryString}` : API_URL;
};

export function useProductList() {
  const hasInitiatedSearch = useRef(false);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);
  
  // Create a memoized URL
  const url = useMemo(() => buildUrl(searchParams), [searchParams]);
  
  // Fetch data using SWR
  const { data, error, isLoading, mutate } = useSWR<ProductListResponse | null>(
    url,
    fetcher,
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
        sort_by: 'name' as SortColumn,
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