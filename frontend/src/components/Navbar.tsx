'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';
import { Category, Product, ProductsResponse } from '@/types';
import HelpModal from './HelpModal';

export default function Navbar() {
  const { user, isAuthenticated, logout, loadUser } = useAuthStore();
  const { items } = useCartStore();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [menuCategories, setMenuCategories] = useState<Category[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Record<number, Product[]>>({});
  const [menuLoading, setMenuLoading] = useState(false);

  useEffect(() => {
    loadUser();
    fetchMenuData();
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const fetchMenuData = async () => {
    setMenuLoading(true);
    try {
      const [categoriesRes, productsRes] = await Promise.all([
        apiClient.get<Category[]>('/categories'),
        apiClient.get<ProductsResponse>('/products', { params: { page: 0, size: 100 } }),
      ]);

      const categories = categoriesRes.data || [];
      const products = productsRes.data?.content || [];
      const groupedProducts: Record<number, Product[]> = {};

      for (const product of products) {
        const categoryId = product.category?.id;
        if (!categoryId) continue;

        if (!groupedProducts[categoryId]) {
          groupedProducts[categoryId] = [];
        }
        groupedProducts[categoryId].push(product);
      }

      setMenuCategories(categories);
      setCategoryProducts(groupedProducts);
    } catch (error) {
      console.error('Failed to load menu data');
    } finally {
      setMenuLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    router.push('/');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setShowSearch(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left Side - Menu Button + Brand + Navigation */}
          <div className="flex items-center gap-6">
            {/* Hamburger Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-2 -m-2 hover:opacity-70 transition-opacity"
              aria-label="Menu"
            >
              <span className="w-6 h-0.5 bg-black"></span>
              <span className="w-6 h-0.5 bg-black"></span>
            </button>

            {/* Brand */}
            <Link href="/" className="text-2xl font-serif font-semibold tracking-[0.08em]">
              LuminousOne
            </Link>

            {/* Desktop Navigation with Hover Dropdown */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Hover Dropdown Menu */}
              <div 
                className="relative"
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
              >
                <button className="text-xs tracking-wider hover:opacity-70 transition-opacity py-2">
                  SHOP
                </button>

                {/* Dropdown */}
                {showDropdown && (
                  <div className="absolute left-0 top-full pt-2 w-screen max-w-4xl -ml-6">
                    <div className="bg-white border border-gray-100 shadow-xl rounded-sm">
                      <div className="grid grid-cols-12 gap-8 p-8">
                        {/* Categories Column */}
                        <div className="col-span-5 border-r border-gray-100 pr-8">
                          <div className="max-h-[500px] overflow-y-auto custom-scrollbar pr-4">
                            <div className="space-y-6">
                              {menuLoading ? (
                                <div className="py-6 text-sm text-gray-500">Loading...</div>
                              ) : menuCategories.length === 0 ? (
                                <div className="py-6 text-sm text-gray-500">No categories found.</div>
                              ) : (
                                menuCategories.map((category, index) => {
                                  const productsForCategory = categoryProducts[category.id] || [];
                                  const isNewCategory = index === 0;
                                  const isSpecialPrice = category.name.toLowerCase().includes('sale') || 
                                                       category.name.toLowerCase().includes('special');

                                  return (
                                    <div key={category.id} className="space-y-2">
                                      {/* Category Header */}
                                      <div className="flex items-center gap-3">
                                        <span className="text-[11px] text-gray-400 tracking-widest font-medium">
                                          [{String(index + 1).padStart(2, '0')}]
                                        </span>
                                        <Link
                                          href={`/products?category=${category.id}`}
                                          onClick={() => setShowDropdown(false)}
                                          className="text-[11px] font-semibold tracking-[0.2em] uppercase hover:text-gray-600 transition-colors"
                                        >
                                          {category.name}
                                          {isNewCategory && (
                                            <span className="ml-2 text-red-500">New</span>
                                          )}
                                          {isSpecialPrice && (
                                            <span className="ml-2 text-red-500">New</span>
                                          )}
                                        </Link>
                                      </div>

                                      {/* Products under category */}
                                      <div className="ml-12 space-y-1.5">
                                        {productsForCategory.length > 0 ? (
                                          productsForCategory.slice(0, 10).map((product) => (
                                            <Link
                                              key={product.id}
                                              href={`/products/${product.id}`}
                                              onClick={() => setShowDropdown(false)}
                                              className="block text-[13px] text-gray-700 hover:text-black transition-colors"
                                            >
                                              {product.name}
                                            </Link>
                                          ))
                                        ) : (
                                          <Link
                                            href={`/products?category=${category.id}`}
                                            onClick={() => setShowDropdown(false)}
                                            className="block text-[13px] text-gray-400 hover:text-gray-600 transition-colors"
                                          >
                                            View all
                                          </Link>
                                        )}
                                      </div>
                                    </div>
                                  );
                                })
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Featured Section */}
                        <div className="col-span-7">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Featured 1 */}
                            <Link
                              href="/products?filter=new"
                              onClick={() => setShowDropdown(false)}
                              className="group relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm"
                            >
                              <img
                                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop"
                                alt="New Collection"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <p className="text-xs tracking-wider uppercase mb-1">The New</p>
                                <p className="text-sm font-semibold">Valentine's Day</p>
                              </div>
                            </Link>

                            {/* Featured 2 */}
                            <Link
                              href="/products?filter=collection"
                              onClick={() => setShowDropdown(false)}
                              className="group relative aspect-[3/4] overflow-hidden bg-gray-100 rounded-sm"
                            >
                              <img
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop"
                                alt="Collection"
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                                <p className="text-xs tracking-wider uppercase mb-1">New</p>
                                <p className="text-sm font-semibold">Collection</p>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link href="/products" className="text-xs tracking-wider hover:opacity-70 transition-opacity">
                ALL PRODUCTS
              </Link>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-xs tracking-wider hover:opacity-70 transition-opacity"
            >
              Search
            </button>

            {/* Shopping Bag */}
            <Link 
              href="/cart"
              className="text-xs tracking-wider hover:opacity-70 transition-opacity"
            >
              Bag [{items.length}]
            </Link>

            {/* Account */}
            {isAuthenticated ? (
              <div className="relative group">
                <button className="text-xs tracking-wider hover:opacity-70 transition-opacity">
                  {user?.name}
                </button>
                <div className="absolute right-0 top-full pt-2 hidden group-hover:block">
                  <div className="bg-white border border-gray-100 shadow-xl rounded-sm py-2 w-40">
                    {user?.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        className="block px-4 py-2 text-xs hover:bg-gray-50 transition-colors"
                      >
                        Admin Dashboard
                      </Link>
                    )}
                    <Link
                      href="/orders"
                      className="block px-4 py-2 text-xs hover:bg-gray-50 transition-colors"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-xs hover:bg-gray-50 transition-colors"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link 
                href="/login"
                className="text-xs tracking-wider hover:opacity-70 transition-opacity"
              >
                Log In
              </Link>
            )}

            {/* Help */}
            <button 
              onClick={() => setShowHelpModal(true)}
              className="text-xs tracking-wider hover:opacity-70 transition-opacity"
            >
              Help
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="border-t border-gray-100 px-6 py-4">
            <form onSubmit={handleSearch} className="flex items-center gap-4 max-w-2xl">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                className="flex-1 text-sm outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="text-xs tracking-wider hover:opacity-70"
              >
                Search
              </button>
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="text-xs tracking-wider hover:opacity-70"
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* Full-Screen Mobile Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 transition-transform duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header with Close Button */}
          <div className="border-b border-gray-100">
            <div className="flex items-center gap-6 px-6 py-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col gap-1.5 p-2 -m-2 hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <span className="w-6 h-0.5 bg-black transform rotate-45 translate-y-1"></span>
                <span className="w-6 h-0.5 bg-black transform -rotate-45 -translate-y-0.5"></span>
              </button>
              <h2 className="text-2xl font-serif font-semibold tracking-[0.08em]">
                LuminousOne
              </h2>
            </div>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="px-6 py-8">
              {/* Categories */}
              <div className="space-y-6">
                {menuLoading ? (
                  <div className="py-6 text-sm text-gray-500">Loading...</div>
                ) : menuCategories.length === 0 ? (
                  <div className="py-6 text-sm text-gray-500">No categories found.</div>
                ) : (
                  menuCategories.map((category, index) => {
                    const productsForCategory = categoryProducts[category.id] || [];

                    return (
                      <div key={category.id} className="space-y-3">
                        {/* Category Header */}
                        <div className="flex items-center gap-3">
                          <span className="text-[11px] text-gray-400 tracking-widest font-medium">
                            [{String(index + 1).padStart(2, '0')}]
                          </span>
                          <Link
                            href={`/products?category=${category.id}`}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm font-semibold tracking-wider uppercase hover:text-gray-600 transition-colors"
                          >
                            {category.name}
                          </Link>
                        </div>

                        {/* Products under category */}
                        <div className="ml-12 space-y-2">
                          {productsForCategory.length > 0 ? (
                            productsForCategory.slice(0, 8).map((product) => (
                              <Link
                                key={product.id}
                                href={`/products/${product.id}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="block text-sm text-gray-700 hover:text-black transition-colors"
                              >
                                {product.name}
                              </Link>
                            ))
                          ) : (
                            <Link
                              href={`/products?category=${category.id}`}
                              onClick={() => setIsMenuOpen(false)}
                              className="block text-sm text-gray-400 hover:text-gray-600 transition-colors"
                            >
                              View all products
                            </Link>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}

                {/* User Section */}
                <div className="pt-6 border-t border-gray-200">
                  {isAuthenticated ? (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold mb-3">{user?.name}</p>
                      {user?.role === 'ADMIN' && (
                        <Link
                          href="/admin"
                          onClick={() => setIsMenuOpen(false)}
                          className="block text-sm hover:underline"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      <Link
                        href="/orders"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-sm hover:underline"
                      >
                        My Orders
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-sm hover:underline text-left"
                      >
                        Log Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link
                        href="/login"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-sm hover:underline"
                      >
                        Log In
                      </Link>
                      <Link
                        href="/register"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-sm hover:underline"
                      >
                        Create Account
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Help Modal */}
      <HelpModal isOpen={showHelpModal} onClose={() => setShowHelpModal(false)} />

      {/* Spacing for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
