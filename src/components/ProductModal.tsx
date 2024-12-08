import { ChevronLeft, ChevronRight, X, ExternalLink } from 'lucide-react';
import { Product } from '../types';
import { useState, useRef, useEffect } from 'react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
  isMobile: boolean;
}

export function ProductModal({ product, onClose, isMobile }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [product.image1, product.image2, product.image3].filter(Boolean);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div 
        className={`bg-white rounded-lg max-h-[90vh] overflow-y-auto relative ${
          isMobile ? 'w-full' : 'max-w-5xl w-full'
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-2 top-2 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
        >
          <X className="h-6 w-6" />
        </button>

        {isMobile ? (
          // Mobile layout
          <div className="flex flex-col p-4 pt-12">
            <div className="relative w-full aspect-square mb-4 bg-gray-50 flex items-center justify-center">
              <img
                src={images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </>
              )}
            </div>
            <div className="space-y-3">
              <h2 className="text-base font-medium text-gray-900">{product.title}</h2>
              <p className="text-lg font-bold text-blue-600">
                ${product.price}
              </p>
              {product.productlink && (
                <a
                  href={product.productlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center px-3 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors duration-300"
                >
                  Buy Now
                  <ExternalLink className="ml-1.5 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        ) : (
          // Updated desktop layout
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
            <div className="relative aspect-square bg-gray-50 flex items-center justify-center">
              <img
                src={images[currentImageIndex]}
                alt={product.title}
                className="w-full h-full object-contain"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white shadow-md transition-all"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white shadow-md transition-all"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                </>
              )}
              
              {/* Thumbnail navigation */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentImageIndex === index 
                          ? 'bg-blue-600 scale-110' 
                          : 'bg-gray-300 hover:bg-gray-400'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between py-4">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-gray-900">{product.title}</h2>
                <p className="text-gray-600">{product.collection}</p>
                <p className="text-gray-700">{product.platform}</p>
                <p className="text-3xl font-bold text-blue-600">
                  ${product.price}
                </p>
              </div>

              {product.productlink && (
                <div className="mt-8">
                  <a
                    href={product.productlink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex justify-center items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-lg font-medium"
                  >
                    Buy Now
                    <ExternalLink className="ml-2 h-6 w-6" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 