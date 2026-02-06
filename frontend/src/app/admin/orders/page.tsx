'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/lib/api';
import { Order } from '@/types';
import toast from 'react-hot-toast';

export default function AdminOrdersPage() {
  const { user, isAuthenticated, loadUser } = useAuthStore();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    loadUser();
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    if (user?.role !== 'ADMIN') {
      router.push('/');
      return;
    }
    fetchOrders();
  }, [isAuthenticated, user]);

  const fetchOrders = async () => {
    try {
      const response = await apiClient.get('/admin/orders');
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: number, status: string) => {
    try {
      await apiClient.put(`/admin/orders/${orderId}/status`, { status });
      toast.success('Order status updated successfully');
      fetchOrders();
      setSelectedOrder(null);
    } catch (error) {
      toast.error('Failed to update order status');
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

  if (!isAuthenticated || user?.role !== 'ADMIN' || loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Orders</h1>

      {/* Orders Table */}
      <div className="card overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Order ID</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Customer</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Total</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Payment</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-4 py-3">#{order.id}</td>
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{order.userName}</p>
                    <p className="text-sm text-gray-500">{order.phone}</p>
                  </div>
                </td>
                <td className="px-4 py-3 font-semibold">${order.totalAmount.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div>
                    <p className="text-sm">{order.paymentMethod}</p>
                    <p className={`text-xs ${order.paymentStatus === 'PAID' ? 'text-green-600' : 'text-yellow-600'}`}>
                      {order.paymentStatus}
                    </p>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => {
                      setSelectedOrder(order);
                      setNewStatus(order.status);
                    }}
                    className="text-primary-600 hover:text-primary-800 mr-2"
                  >
                    Update
                  </button>
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-gray-600 hover:text-gray-800"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {orders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No orders found
          </div>
        )}
      </div>

      {/* Status Update Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Update Order Status</h2>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Order #{selectedOrder.id}</p>
              <p className="font-semibold mb-4">Customer: {selectedOrder.userName}</p>
              
              <label className="block text-sm font-medium text-gray-700 mb-2">
                New Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="input-field"
              >
                <option value="PENDING">PENDING</option>
                <option value="PAID">PAID</option>
                <option value="SHIPPED">SHIPPED</option>
                <option value="DELIVERED">DELIVERED</option>
                <option value="CANCELLED">CANCELLED</option>
              </select>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setSelectedOrder(null)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedOrder.id, newStatus)}
                className="btn-primary"
              >
                Update Status
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
