// Product Types
export interface Product {
  id: number;
  name: string;
  buying_price: string;
  selling_price: string;
  stock: number;
  img: string;
  brand_name: string;
  category_name: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// API Response Type
export interface ProductListResponse {
  current_page: number;
  data: Product[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

// Sort options
export type SortColumn = 
  | "name"
  | "buying_price"
  | "selling_price"
  | "stock"
  | "brand_name"
  | "category_name"
  | "status";

export type SortOrder = "asc" | "desc";

// Search params
export interface SearchParams {
  search?: string;
  sort_by?: SortColumn;
  order?: SortOrder;
  page?: number;
} 