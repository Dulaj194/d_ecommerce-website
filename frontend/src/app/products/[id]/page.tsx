'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import apiClient from '@/lib/api';
import { Product } from '@/types';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    fetchProduct();
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response = await apiClient.get<Product>(`/products/${params.id}`);
      setProduct(response.data);
    } catch (error) {
      toast.error('Failed to fetch product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to add items to cart');
      router.push('/login');
      return;
    }

    if (!product) return;

    setAdding(true);
    try {
      await apiClient.post('/cart/items', {
        productId: product.id,
        quantity,
      });
      toast.success('Added to cart!');
      router.push('/cart');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add to cart');
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-500 text-lg">Product not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative h-96 md:h-full min-h-[400px]">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          )}
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-2">
            <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
              {product.category.name}
            </span>
          </div>
          
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          <div className="text-4xl font-bold text-primary-600 mb-6">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-gray-700 mb-6 leading-relaxed">{product.description}</p>
          
          <div className="mb-6">
            <div className="flex items-center text-gray-600 mb-2">
              <span className="font-semibold mr-2">Availability:</span>
              {product.stock > 0 ? (
                <span className="text-green-600">{product.stock} in stock</span>
              ) : (
                <span className="text-red-600">Out of stock</span>
              )}
            </div>
          </div>

          {product.stock > 0 && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(product.stock, Math.max(1, parseInt(e.target.value) || 1)))}
                  className="input-field w-32"
                />
              </div>

              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="btn-primary w-full md:w-auto px-12"
              >
                {adding ? 'Adding...' : 'Add to Cart'}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
