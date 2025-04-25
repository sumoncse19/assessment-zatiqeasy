"use client";

import { useCallback, memo } from "react";
import Image from "next/image";
import { Product, SortColumn, SortOrder } from "@/types/index";

interface ProductTableProps {
  products: Product[];
  onSort: (column: SortColumn, order: SortOrder) => void;
  sortColumn?: SortColumn;
  sortOrder?: SortOrder;
}

// Function to generate consistent image URLs based on product ID
const getProductImage = (product: Product) => {
  // Use product ID as seed for consistent image selection
  const seed = parseInt(product.id.toString(), 10) % 10;
  
  const imageUrls = [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f",
    "https://images.unsplash.com/photo-1485955900006-10f4d324d411",
    "https://images.unsplash.com/photo-1572635196237-14b3f281503f",
    "https://images.unsplash.com/photo-1560343090-f0409e92791a",
    "https://images.unsplash.com/photo-1564466809058-bf4114d55352",
    "https://images.unsplash.com/photo-1491553895911-0055eca6402d",
    "https://images.unsplash.com/photo-1581235720704-06d3acfcb36f"
  ];
  
  return `${imageUrls[seed]}?auto=format&fit=crop&w=200&h=200`;
};

// Create a memoized table row component to prevent unnecessary re-renders
const ProductTableRow = memo(function ProductTableRow({ product }: { product: Product }) {
  // Use external image URL
  const imageUrl = getProductImage(product);
    
  return (
    <tr className="hover:bg-gray-50">
      <td className="p-3 border border-gray-300">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 w-12 h-12 relative">
            <Image 
              src={imageUrl} 
              alt={product.name} 
              fill
              className="object-contain rounded-md"
              sizes="48px"
            />
          </div>
          <div>{product.name}</div>
        </div>
      </td>
      <td className="p-3 border border-gray-300">${product.buying_price}</td>
      <td className="p-3 border border-gray-300">${product.selling_price}</td>
      <td className="p-3 border border-gray-300">{product.stock}</td>
      <td className="p-3 border border-gray-300">{product.brand_name}</td>
      <td className="p-3 border border-gray-300">{product.category_name}</td>
      <td className="p-3 border border-gray-300">
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            product.status === "active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {product.status}
        </span>
      </td>
    </tr>
  );
});

// Memoize the entire product table component
const ProductTable = function ProductTable({
  products,
  onSort,
  sortColumn = "name",
  sortOrder = "asc",
}: ProductTableProps) {
  // Current sort state
  const currentSort = {
    column: sortColumn,
    order: sortOrder,
  };

  // Handle column header click for sorting
  const handleSort = useCallback((column: SortColumn) => {
    const newOrder: SortOrder =
      currentSort.column === column && currentSort.order === "asc" ? "desc" : "asc";
    
    onSort(column, newOrder);
  }, [currentSort.column, currentSort.order, onSort]);

  // Get sort indicator for column
  const getSortIndicator = useCallback((column: SortColumn) => {
    if (currentSort.column !== column) return null;
    
    return currentSort.order === "asc" ? "↑" : "↓";
  }, [currentSort.column, currentSort.order]);

  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th 
              className="p-3 text-left border border-gray-300 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("name")}
            >
              Name {getSortIndicator("name")}
            </th>
            <th 
              className="p-3 text-left border border-gray-300 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("buying_price")}
            >
              Buying Price {getSortIndicator("buying_price")}
            </th>
            <th 
              className="p-3 text-left border border-gray-300 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("selling_price")}
            >
              Selling Price {getSortIndicator("selling_price")}
            </th>
            <th 
              className="p-3 text-left border border-gray-300 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("stock")}
            >
              Stock {getSortIndicator("stock")}
            </th>
            <th 
              className="p-3 text-left border border-gray-300 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("brand_name")}
            >
              Brand {getSortIndicator("brand_name")}
            </th>
            <th 
              className="p-3 text-left border border-gray-300 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("category_name")}
            >
              Category {getSortIndicator("category_name")}
            </th>
            <th 
              className="p-3 text-left border border-gray-300 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSort("status")}
            >
              Status {getSortIndicator("status")}
            </th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="p-3 text-center border border-gray-300">
                No products found
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <ProductTableRow key={product.id} product={product} />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default memo(ProductTable); 