import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Product } from '../types';
import { useState, useEffect } from 'react';
import { ProductModal } from './ProductModal';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const images = [product.image1, product.image2, product.image3].filter(Boolean);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is typical tablet/mobile breakpoint
    };

    // Check on initial load
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);

    // Cleanup
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleCardClick = (e: React.MouseEvent) => {
    if (!(e.target as HTMLElement).closest('.navigation-arrow')) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div
        className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${!isMobile ? 'cursor-pointer' : ''}`}
        onClick={handleCardClick}
      >
        <div className="relative group">
          <div className="relative w-full" style={{ minHeight: '200px' }}>
            <img
              src={images[currentImageIndex]}
              alt={product.title}
              loading="lazy"
              className="w-full h-auto object-contain"
              style={{ 
                backgroundColor: '#f8f8f8',
                minHeight: isMobile ? '250px' : '200px',
                maxHeight: '400px'
              }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=800&q=80';
              }}
            />
            
            {/* Navigation arrows */}
            {images.length > 1 && (
              <>
                <div 
                  className="navigation-arrow absolute left-2 top-1/2 transform -translate-y-1/2 cursor-pointer" 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrevImage();
                  }}
                >
                  <ChevronLeft className="h-8 w-8 text-white" />
                </div>
                <div 
                  className="navigation-arrow absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNextImage();
                  }}
                >
                  <ChevronRight className="h-8 w-8 text-white" />
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Content section */}
        <div className="p-4">
          {isMobile ? (
            // Mobile layout - simplified
            <div className="space-y-2">
              <h2 className="text-base font-medium text-gray-900 line-clamp-1">
                {product.title || 'Untitled Product'}
              </h2>
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-blue-600">
                  ${product.price || 'Price unavailable'}
                </span>
                {product.productlink && (
                  <a
                    href={product.productlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700 transition-colors duration-300"
                  >
                    Buy
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                )}
              </div>
            </div>
          ) : (
            // Desktop layout - full content
            <>
              <h2 className="text-lg font-medium text-gray-900 mb-1 line-clamp-1 hover:text-blue-600 transition-colors duration-300">
                {product.title || 'Untitled Product'}
              </h2>
              <p className="text-sm text-gray-500 mb-1">{product.collection || 'No Collection'}</p>
              <p className="text-sm text-gray-600 mb-2">{product.platform || 'N/A'}</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">${product.price || 'Price unavailable'}</span>
                {product.productlink && (
                  <a
                    href={product.productlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-300 ml-3"
                  >
                    Buy
                    <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Only render modal if not on mobile and modal is open */}
      {isModalOpen && (
        <ProductModal 
          product={product} 
          onClose={() => setIsModalOpen(false)} 
          isMobile={isMobile}
        />
      )}
    </>
  );
}
