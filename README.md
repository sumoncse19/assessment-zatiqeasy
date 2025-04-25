# Product List Implementation with Next.js and TypeScript

A product list implementation with search, sorting, and pagination functionality. The project uses Next.js and TypeScript, communicating directly with the external API.

## Live Demo

Check out the [live demo](https://assessment-zatiqeasy.vercel.app)

## Features

- **Search Functionality**: Filter products by name with debounced input
- **Sorting**: Sort by any column (name, buying_price, selling_price, stock, etc.)
- **Pagination**: Navigate through large result sets
- **Responsive Design**: Works on all device sizes
- **Performance Optimized**: Memoization, efficient data fetching, and proper caching

## Project Structure

```
/
├── app/                       # Next.js app directory
│   └── products/              # Product list page
│       ├── page.tsx           # Main products page
│       └── product-list.tsx   # Product list component
├── components/                # Reusable UI components
│   ├── pagination.tsx         # Pagination component
│   ├── product-table.tsx      # Product table component
│   ├── search-bar.tsx         # Search input component
│   ├── sort-control.tsx       # Sorting controls component
│   └── ui/                    # UI components library
├── hooks/                     # Custom React hooks
│   └── use-product-list.ts    # Data fetching and state management
├── types/                     # TypeScript type definitions
│   └── index.ts               # Types for product list
├── lib/                       # Utility functions and shared logic
└── public/                    # Static assets
```

## Getting Started

### Prerequisites

- Node.js 16.8.0 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/sumoncse19/assessment-zatiqeasy.git
cd assessment-zatiqeasy
```

2. Install dependencies:

```bash
# Using npm
npm install

# Using yarn
yarn

# Using pnpm
pnpm install
```

3. Start the development server:

```bash
# Using npm
npm run dev

# Using yarn
yarn dev

# Using pnpm
pnpm dev
```

4. Open [http://localhost:3000/products](http://localhost:3000/products) in your browser to see the result.

## API Integration

The application connects to the following API:

- Base URL: `https://captainbinary.com/`
- Endpoint: `https://captainbinary.com/api/ProductList`

### API Parameters

The external API accepts the following query parameters:

- `search`: Search term for filtering products
- `sort_by`: Column to sort by (name, buying_price, selling_price, stock, brand_name, category_name, status)
- `order`: Sort order ('asc' or 'desc')
- `page`: Page number for pagination

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

## Building for Production

```bash
# Using npm
npm run build
npm start

# Using yarn
yarn build
yarn start

# Using pnpm
pnpm build
pnpm start
```

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type checking
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [SWR](https://swr.vercel.app/) - Data fetching and caching

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

[Md Sumon Meah](https://github.com/sumoncse19) 