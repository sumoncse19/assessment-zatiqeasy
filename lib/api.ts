import { ProductListResponse, SearchParams } from "@/types";

// API constants
export const API_URL = "https://captainbinary.com/api/ProductList";

// Fetcher function for SWR
export const fetchProducts = async (url: string | null): Promise<ProductListResponse | null> => {
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
export const buildProductsUrl = (params: SearchParams | null): string | null => {
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