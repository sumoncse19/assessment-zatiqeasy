# Product List Implementation

This directory contains a product list implementation with search, sorting, and pagination functionality. The implementation uses Next.js and TypeScript, communicating directly with the external API.

## Directory Structure

```
app/products/
├── README.md                 # Documentation
├── page.tsx                  # Main page component
├── product-list.tsx         # Main product list container
├── components/              # UI Components
│   ├── product-table.tsx    # Table component for displaying products
│   ├── search-bar.tsx       # Search input component
│   ├── sort-control.tsx     # Sorting controls component
│   └── pagination.tsx       # Pagination component
├── hooks/                   # Custom hooks
│   └── use-product-list.ts  # Main data fetching and state management hook
└── types/                   # TypeScript type definitions
    └── index.ts            # Type definitions for the product list
```

## Implementation Details

1. **API Integration**
   - Direct integration with captainbinary.com API
   - Implements proper error handling and retry logic
   - Uses appropriate headers for API communication

2. **State Management**
   - Uses SWR for data fetching and caching
   - Implements optimized pagination and sorting
   - Maintains clean separation of concerns

3. **Components**
   - Modular component architecture
   - Implements proper TypeScript types
   - Uses Tailwind CSS for styling

4. **Performance Optimizations**
   - Implements proper memoization
   - Uses efficient data fetching strategies
   - Implements proper caching with SWR

## Usage

To use the product list:

1. Navigate to `/products` route
2. The list will automatically load with default sorting
3. Use the search bar to filter products
4. Click column headers to sort
5. Use pagination controls to navigate between pages

## API Parameters

The external API accepts the following query parameters:

- `search`: Search term for filtering products
- `sort_by`: Column to sort by (e.g., 'name', 'price')
- `order`: Sort order ('asc' or 'desc')
- `page`: Page number for pagination 