import { ProductCard } from './ProductCard';
import { Product } from '../types';
import { useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price-desc');
  const [filterOption, setFilterOption] = useState('all');

  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filterOption === 'all' || product.collection === filterOption)
  );

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortOption === 'price-asc') return (a.price ?? Infinity) - (b.price ?? Infinity);
    if (sortOption === 'price-desc') return (b.price ?? -Infinity) - (a.price ?? -Infinity);
    return 0;
  });

  const uniqueCollections = Array.from(new Set(products.map(product => product.collection))).filter(Boolean);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 relative">
      <input
        type="text"
        placeholder="Search products..."
        className="w-full p-2 mb-2 border border-gray-300 rounded-md"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      <div className="flex space-x-4 mb-4">
        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="p-2 border border-gray-300 rounded-md">
          <option value="default">Sort By</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>

        <select value={filterOption} onChange={(e) => setFilterOption(e.target.value)} className="p-2 border border-gray-300 rounded-md">
          <option value="all">Collections</option>
          {uniqueCollections.map((collection, index) => (
            <option key={index} value={collection}>{collection}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 auto-rows-fr">
        {sortedProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* Move to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
      >
        <ArrowUp className="h-6 w-6" />
      </button>
    </div>
  );
}
