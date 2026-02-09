'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';
import { Order } from '@/types';
import { useAuthStore } from '@/store/authStore';
import toast from 'react-hot-toast';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
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
    fetchOrder();
  }, [isAuthenticated]);

  const fetchOrder = async () => {
    try {
      const response = await apiClient.get<Order>(`/orders/${params.id}`);
      setOrder(response.data);
    } catch (error) {
      toast.error('Failed to fetch order');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'PAID':
        return 'bg-blue-100 text-blue-800';
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800';
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <p className="text-gray-500">Order not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Order Details</h1>
        <p className="text-gray-600">Order #{order.id}</p>
      </div>

      <div className="space-y-6">
        {/* Order Status */}
        <div className="card">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold mb-2">Order Status</h2>
              <p className="text-gray-600">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
              {order.status}
            </span>
          </div>
        </div>

        {/* Delivery Information */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Delivery Information</h2>
          <div className="space-y-2">
            <div>
              <span className="font-semibold">Address:</span>
              <p className="text-gray-700">{order.address}</p>
            </div>
            <div>
              <span className="font-semibold">Phone:</span>
              <p className="text-gray-700">{order.phone}</p>
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Payment Information</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Payment Method:</span>
              <span>{order.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Payment Status:</span>
              <span className={order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-yellow-600'}>
                {order.paymentStatus}
              </span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Order Items</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between items-center pb-4 border-b last:border-b-0">
                <div>
                  <p className="font-semibold">{item.productName}</p>
                  <p className="text-sm text-gray-600">
                    ${item.unitPrice.toFixed(2)} x {item.quantity}
                  </p>
                </div>
                <p className="font-bold">${item.total.toFixed(2)}</p>
              </div>
            ))}

            <div className="flex justify-between items-center pt-4 border-t font-bold text-lg">
              <span>Total</span>
              <span className="text-primary-600">${order.totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => router.push('/orders')}
          className="btn-secondary w-full"
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
}
