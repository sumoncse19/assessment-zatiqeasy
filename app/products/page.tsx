import { Metadata } from "next";
import ProductList from "./product-list";

export const metadata: Metadata = {
  title: "Product List | CaptainBinary.com API Demo",
  description: "Browse our collection of products with search, sort, and filter options - Direct integration with CaptainBinary.com API",
};

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-2">Product List</h1>
      <p className="text-gray-600 mb-1">
        Browse, search, and filter our product collection.
      </p>
      <ProductList />
    </div>
  );
} 