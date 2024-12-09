import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { useState } from 'react';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [selectedCollection, setSelectedCollection] = useState<string>(''); // State for collection filter
  const [sort, setSort] = useState<string>('price-desc'); // Set default sort to "price-desc"

  // Extract unique collections from products
  const uniqueCollections = Array.from(new Set(products.map(product => product.collection))).filter(Boolean);

  // Filter products based on the selected collection
  const filteredProducts = products.filter(product => {
    return selectedCollection ? product.collection === selectedCollection : true;
  });

  // Sort products based on the selected sort criteria
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === 'price-asc') {
      return parseFloat(a.price) - parseFloat(b.price);
    } else if (sort === 'price-desc') {
      return parseFloat(b.price) - parseFloat(a.price);
    } else {
      return 0; // No sorting
    }
  });

  return (
    <div>
      {/* Filter and Sort Options */}
      <div className="mb-4 py-1 flex flex-row justify-start items-center space-x-2 sticky top-0 bg-white text-black z-10">
        <select
          value={selectedCollection}
          onChange={(e) => setSelectedCollection(e.target.value)}
          className="border rounded-md p-1 text-xs bg-white text-black"
        >
          <option value="">All Collections</option>
          {uniqueCollections.map((collection) => (
            <option key={collection} value={collection}>
              {collection}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border rounded-md p-1 text-xs bg-white text-black"
        >
          <option value="">Sort by</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {sortedProducts.map((product) => (
          <ProductCard key={product.title} product={product} />
        ))}
      </div>
    </div>
  );
}
