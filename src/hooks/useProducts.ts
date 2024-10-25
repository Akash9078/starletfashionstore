import { useState, useEffect } from 'react';
import { Product } from '../types';

const SHEET_ID = '1ERCakBCK0qAhL8MbrNynS6NouBuulFqfDDfZk35w2GM';
const SHEET_NAME = 'Sheet1';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${SHEET_NAME}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const text = await response.text();
        const jsonString = text.substring(47).slice(0, -2);
        const json = JSON.parse(jsonString);
        
        const headers = json.table.cols.map((col: { label: string }) => col.label.toLowerCase());
        
        const formattedProducts = json.table.rows.map((row: { c: any[] }) => {
          const product: any = {};
          headers.forEach((header: string, index: number) => {
            product[header] = row.c[index]?.v ?? '';
          });
          return product as Product;
        });

        setProducts(formattedProducts);
        setError(null);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Unable to load products. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, loading, error };
}