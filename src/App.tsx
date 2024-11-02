import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ProductGrid } from './components/ProductGrid';
import { useProducts } from './hooks/useProducts';
import { useEffect } from 'react';

function App() {
  const { products, loading, error } = useProducts();

  // Save scroll position periodically
  useEffect(() => {
    const saveScrollPosition = () => {
      localStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    // Save scroll position every 1 second
    const scrollInterval = setInterval(saveScrollPosition, 1000);

    // Save on scroll
    window.addEventListener('scroll', saveScrollPosition);

    // Save when leaving page
    window.addEventListener('beforeunload', saveScrollPosition);

    // Restore scroll position after content loads
    if (!loading && products.length > 0) {
      const savedPosition = localStorage.getItem('scrollPosition');
      if (savedPosition) {
        const position = parseInt(savedPosition);
        // Wait for DOM to update
        setTimeout(() => {
          window.scrollTo({
            top: position,
            behavior: 'instant'
          });
        }, 500);
      }
    }

    return () => {
      clearInterval(scrollInterval);
      window.removeEventListener('scroll', saveScrollPosition);
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [loading, products]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {loading && (
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mx-auto max-w-md">
            <p className="text-red-800 text-center">{error}</p>
            <button 
              onClick={() => {
                // Save current position before reload
                localStorage.setItem('scrollPosition', window.scrollY.toString());
                window.location.reload();
              }} 
              className="mt-4 mx-auto block px-4 py-2 bg-red-100 text-red-800 rounded-md hover:bg-red-200 transition-colors duration-300"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && products.length === 0 && (
          <div className="text-center text-gray-500">
            <p>No products found.</p>
          </div>
        )}

        {!loading && !error && products.length > 0 && <ProductGrid products={products} />}
      </main>
      
      <footer className="bg-white py-4">
        <p className="text-gray-700 mb-2 text-center">We are always happy to see you here</p>
        <p className="text-gray-700 text-center">
          Any questions? Drop a message to 
          <a href="https://share.hsforms.com/1CKZ_K7ruS7GuMd6E3-9Mnws1413" className="text-blue-700"> Starlet</a>
        </p>
      </footer>

      <Footer />
    </div>
  );
}

export default App;
