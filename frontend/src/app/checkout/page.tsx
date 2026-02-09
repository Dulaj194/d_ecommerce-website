'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';
import { Cart, Order } from '@/types';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const [cart, setCart] = useState<Cart | null>(null);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const { isAuthenticated, loadUser } = useAuthStore();
  const router = useRouter();

  // Load user once on mount
  useEffect(() => {
    loadUser();
  }, []);

  // Authentication and data fetching
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    fetchCart();
  }, [isAuthenticated]);

  const fetchCart = async () => {
    try {
      const response = await apiClient.get<Cart>('/cart');
      if (response.data.items.length === 0) {
        toast.error('Your cart is empty');
        router.push('/products');
        return;
      }
      setCart(response.data);
    } catch (error) {
      toast.error('Failed to fetch cart');
      router.push('/cart');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address || !phone) {
      toast.error('Please fill in all fields');
      return;
    }

    setSubmitting(true);
    try {
      const response = await apiClient.post<Order>('/orders', {
        address,
        phone,
        paymentMethod,
      });
      
      toast.success('Order placed successfully!');
      router.push(`/orders/${response.data.id}`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setSubmitting(false);
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!cart) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Delivery Information */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Delivery Address *
              </label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                rows={3}
                className="input-field"
                placeholder="Enter your complete delivery address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="input-field"
                placeholder="+1 234 567 8900"
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          
          <div className="space-y-2">
            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                checked={paymentMethod === 'Cash on Delivery'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-semibold">Cash on Delivery</div>
                <div className="text-sm text-gray-600">Pay when you receive your order</div>
              </div>
            </label>

            <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="radio"
                name="payment"
                value="Card Payment"
                checked={paymentMethod === 'Card Payment'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <div>
                <div className="font-semibold">Card Payment (Demo)</div>
                <div className="text-sm text-gray-600">Instant payment confirmation</div>
              </div>
            </label>
          </div>
        </div>

        {/* Order Summary */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          
          <div className="space-y-2 mb-4">
            {cart.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.product.name} x {item.quantity}</span>
                <span>${item.itemTotal.toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span className="text-primary-600">${cart.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full py-3 text-lg"
        >
          {submitting ? 'Placing Order...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}
