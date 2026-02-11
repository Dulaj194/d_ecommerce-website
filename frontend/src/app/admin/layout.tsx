'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';
import { AuthResponse } from '@/types';
import { useAuthStore } from '@/store/authStore';

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const { loadUser, logout } = useAuthStore();
  const [isChecking, setIsChecking] = useState(true);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    let active = true;

    const verifyAdminAccess = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.replace('/login');
        if (active) setIsChecking(false);
        return;
      }

      try {
        const response = await apiClient.get<AuthResponse>('/auth/me');
        const { token: _ignoredToken, ...currentUser } = response.data;

        // Use backend-verified user data to avoid trusting editable localStorage role.
        localStorage.setItem('user', JSON.stringify(currentUser));
        loadUser();

        if (currentUser.role !== 'ADMIN') {
          router.replace('/');
          if (active) setIsChecking(false);
          return;
        }

        if (active) {
          setIsAllowed(true);
          setIsChecking(false);
        }
      } catch (error) {
        logout();
        router.replace('/login');
        if (active) setIsChecking(false);
      }
    };

    verifyAdminAccess();

    return () => {
      active = false;
    };
  }, [loadUser, logout, router]);

  if (isChecking || !isAllowed) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return <>{children}</>;
}
