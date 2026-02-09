'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import apiClient from '@/lib/api';
import { Product, Order } from '@/types';

export default function AdminDashboard() {
  const { user, isAuthenticated, loadUser } = useAuthStore();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    recentOrders: [] as Order[],
  });
  const [loading, setLoading] = useState(true);

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
    if (user?.role !== 'ADMIN') {
      router.push('/');
      return;
    }
    fetchStats();
  }, [isAuthenticated, user?.role]);

  const fetchStats = async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        apiClient.get('/products?page=0&size=1'),
        apiClient.get('/admin/orders'),
      ]);

      setStats({
        totalProducts: productsRes.data.totalElements,
        totalOrders: ordersRes.data.length,
        recentOrders: ordersRes.data.slice(0, 5),
      });
    } catch (error) {
      console.error('Failed to fetch stats');
    } finally {
      setLoading(false);
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
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Products</h3>
          <p className="text-4xl font-bold">{stats.totalProducts}</p>
        </div>

        <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-4xl font-bold">{stats.totalOrders}</p>
        </div>

        <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
          <h3 className="text-lg font-semibold mb-2">Recent Orders</h3>
          <p className="text-4xl font-bold">{stats.recentOrders.length}</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link href="/admin/products" className="btn-primary text-center">
            Manage Products
          </Link>
          <Link href="/admin/categories" className="btn-primary text-center">
            Manage Categories
          </Link>
          <Link href="/admin/orders" className="btn-primary text-center">
            Manage Orders
          </Link>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="card">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        {stats.recentOrders.length === 0 ? (
          <p className="text-gray-500">No orders yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Order ID</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Customer</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Total</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {stats.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">#{order.id}</td>
                    <td className="px-4 py-2">{order.userName}</td>
                    <td className="px-4 py-2">${order.totalAmount.toFixed(2)}</td>
                    <td className="px-4 py-2">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-600">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
