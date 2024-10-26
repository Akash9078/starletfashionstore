import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [product.image1, product.image2, product.image3].filter(Boolean);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative group">
        <img
          src={images[currentImageIndex]}
          alt={product.title}
          className="object-cover transition-transform duration-300"
          style={{ width: '100%', height: 'auto', maxWidth: '1000px', maxHeight: '1500px' }}
          onError={(e) => {
            const img = e.target as HTMLImageElement;
            img.src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"></div>
        
        {/* Arrow icons for navigation */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={handlePrevImage}>
          <ChevronLeft className="h-8 w-8 text-white" />
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={handleNextImage}>
          <ChevronRight className="h-8 w-8 text-white" />
        </div>
      </div>
      
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors duration-300">{product.title || 'Untitled Product'}</h2>
        {/* New Subtitle for Collection */}
        <p className="text-gray-500 mb-2">{product.collection || 'No Collection'}</p>
        <p className="text-gray-600 mb-4">{product.platform || 'N/A'}</p>
        <div className="flex justify-between items-center"> {/* Flex container for price and button */}
          <span className="text-2xl font-bold text-blue-600">${product.price || 'Price unavailable'}</span>
          {product.productlink && (
            <a
              href={product.productlink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 ml-4" // Added margin-left for spacing
            >
              Buy {/* Changed from "Buy Now" to "Buy" */}
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
