import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Product } from '../types';
import { useState, useRef, useEffect } from 'react';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const images = [product.image1, product.image2, product.image3].filter(Boolean);
  const slideIntervalRef = useRef<number>();

  // Prevent body scroll when modal is open
  useEffect(() => {
    // Save the current overflow style
    const originalStyle = window.getComputedStyle(document.body).overflow;
    // Prevent scrolling on mount
    document.body.style.overflow = 'hidden';
    // Re-enable scrolling on cleanup
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Auto-slide functionality with better control
  useEffect(() => {
    const startSlideShow = () => {
      if (images.length <= 1) return;

      slideIntervalRef.current = setInterval(() => {
        if (!isPaused) {
          setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }
      }, 2000);
    };

    startSlideShow();

    return () => {
      if (slideIntervalRef.current) {
        clearInterval(slideIntervalRef.current);
      }
    };
  }, [images.length, isPaused]);

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setIsPaused(true);
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setIsPaused(true);
    if (slideIntervalRef.current) {
      clearInterval(slideIntervalRef.current);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div 
        ref={modalRef}
        className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden relative"
      >
        <div className="flex flex-col md:flex-row h-full">
          {/* Image section */}
          <div className="relative w-full md:w-1/2 bg-gray-50 flex items-center justify-center">
            <div 
              className="relative w-full aspect-[2/3] max-h-[80vh]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${
                    index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.title} - Image ${index + 1}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop';
                    }}
                  />
                </div>
              ))}
              
              {/* Navigation arrows */}
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-black hover:bg-opacity-10 rounded-full z-20"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-8 w-8 text-gray-800" />
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 hover:bg-black hover:bg-opacity-10 rounded-full z-20"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-8 w-8 text-gray-800" />
              </button>

              {/* Image indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
                {images.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentImageIndex ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                    onClick={() => {
                      setCurrentImageIndex(index);
                      setIsPaused(true);
                      if (slideIntervalRef.current) {
                        clearInterval(slideIntervalRef.current);
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Details section */}
          <div className="w-full md:w-1/2 p-8 overflow-y-auto flex flex-col h-full">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 leading-tight">
              {product.title || 'Untitled Product'}
            </h2>

            <div className="space-y-6 flex-grow">
              <div className="space-y-2">
                <p className="text-sm text-gray-500 uppercase">Platform</p>
                <p className="text-lg text-gray-800">{product.platform || 'N/A'}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500 uppercase">Fabric</p>
                <p className="text-lg text-gray-800">{product.fabric || 'N/A'}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500 uppercase">Collection</p>
                <p className="text-lg text-gray-800">{product.collection || 'N/A'}</p>
              </div>

              <div className="space-y-2">
                <p className="text-sm text-gray-500 uppercase">Price</p>
                <p className="text-3xl font-bold text-blue-600">
                  ${product.price || 'Price unavailable'}
                </p>
              </div>
            </div>

            <div className="mt-8">
              {product.productlink && (
                <a
                  href={product.productlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center px-6 py-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300 text-lg font-semibold"
                >
                  Buy Now
                </a>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute bottom-4 right-4 px-4 py-2 flex items-center gap-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors duration-300"
          aria-label="Close modal"
        >
          <span className="text-sm font-medium">Close</span>
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
} 