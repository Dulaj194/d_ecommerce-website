'use client';

import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import { useCartStore } from '@/store/cartStore';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const { user, isAuthenticated, logout, loadUser } = useAuthStore();
  const { items } = useCartStore();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    loadUser();
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
      <nav className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-gray-200">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Left Side - Menu Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex flex-col gap-1.5 hover:opacity-70 transition-opacity"
            aria-label="Menu"
          >
            <span className="w-6 h-0.5 bg-black"></span>
            <span className="w-6 h-0.5 bg-black"></span>
          </button>

          {/* Center - Brand Logo */}
          <Link 
            href="/" 
            className="text-3xl font-bold tracking-tighter hover:opacity-70 transition-opacity"
          >
            LuminousOne
          </Link>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-6">
            {/* Search */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-xs tracking-wider hover:opacity-70 transition-opacity"
            >
              SEARCH
            </button>

            {/* Shopping Bag */}
            <Link 
              href="/cart"
              className="text-xs tracking-wider hover:opacity-70 transition-opacity"
            >
              SHOPPING BAG [{items.length}]
            </Link>

            {/* Log In / Profile */}
            {isAuthenticated ? (
              <Link 
                href={user?.role === 'ADMIN' ? '/admin' : '/orders'}
                className="text-xs tracking-wider hover:opacity-70 transition-opacity"
              >
                {user?.name?.toUpperCase()}
              </Link>
            ) : (
              <Link 
                href="/login"
                className="text-xs tracking-wider hover:opacity-70 transition-opacity"
              >
                LOG IN
              </Link>
            )}

            {/* Help */}
            <Link 
              href="/help"
              className="text-xs tracking-wider hover:opacity-70 transition-opacity"
            >
              HELP
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {showSearch && (
          <div className="border-t border-gray-200 px-6 py-4">
            <form onSubmit={handleSearch} className="flex items-center gap-4">
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
                SEARCH
              </button>
              <button
                type="button"
                onClick={() => setShowSearch(false)}
                className="text-xs tracking-wider hover:opacity-70"
              >
                CANCEL
              </button>
            </form>
          </div>
        )}
      </nav>

      {/* Full-Width Slide-out Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 transition-transform duration-300 ease-in-out overflow-hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header with Brand and Close Button */}
          <div className="flex items-center justify-between px-12 py-6 border-b border-gray-100">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="flex flex-col gap-1.5 hover:opacity-70 transition-opacity"
              aria-label="Close menu"
            >
              <span className="w-6 h-0.5 bg-black transform rotate-45 translate-y-1"></span>
              <span className="w-6 h-0.5 bg-black transform -rotate-45 -translate-y-0.5"></span>
            </button>
            <h2 className="text-4xl font-bold tracking-tighter absolute left-1/2 transform -translate-x-1/2">
              LuminousOne
            </h2>
          </div>

          {/* 3-Column Layout */}
          <div className="flex-1 grid grid-cols-12 gap-12 px-12 py-8 overflow-hidden">
            {/* LEFT COLUMN - Main Navigation */}
            <div className="col-span-2">
              <nav className="flex flex-col space-y-2">
                <Link
                  href="/products?category=women"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-light hover:opacity-60 transition-opacity py-2"
                >
                  WOMAN
                </Link>
                <Link
                  href="/products?category=men"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-light hover:opacity-60 transition-opacity py-2"
                >
                  MAN
                </Link>
                <Link
                  href="/products?category=kids"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-light hover:opacity-60 transition-opacity py-2"
                >
                  KIDS
                </Link>
                <Link
                  href="/products?category=travel"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-2xl font-light hover:opacity-60 transition-opacity py-2"
                >
                  TRAVEL MODE
                </Link>
              </nav>
            </div>

            {/* MIDDLE COLUMN - Featured Categories */}
            <div className="col-span-6 overflow-y-auto pr-8 border-r border-gray-200 menu-scroll">
              <div className="space-y-8">
              {/* [01] NEW IN */}
              <div className="flex gap-6">
                <div className="flex items-start gap-2 pt-0.5">
                  <span className="text-xs text-gray-500">[01]</span>
                  <h3 className="text-sm font-semibold tracking-wider whitespace-nowrap">NEW IN</h3>
                </div>
                <div className="space-y-2">
                  <Link
                    href="/products?filter=new"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm hover:underline"
                  >
                    THE NEW
                  </Link>
                  <Link
                    href="/products?filter=valentine"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm hover:underline text-red-600"
                  >
                    VALENTINE&apos;S DAY
                  </Link>
                  <Link
                    href="/products?filter=featured"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-sm hover:underline"
                  >
                    THE ITEM
                  </Link>
                </div>
              </div>

              {/* [02] COLLECTION */}
              <div className="flex gap-6">
                <div className="flex items-start gap-2 pt-0.5">
                  <span className="text-xs text-gray-500">[02]</span>
                  <h3 className="text-sm font-semibold tracking-wider whitespace-nowrap">COLLECTION</h3>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link
                    href="/products?filter=jackets"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm hover:underline"
                  >
                    JACKETS
                  </Link>
                  <Link
                    href="/products?filter=coats"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm hover:underline"
                  >
                    COATS
                  </Link>
                  <Link
                    href="/products?filter=blazers"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm hover:underline"
                  >
                    BLAZERS
                  </Link>
                  <Link
                    href="/products?filter=knitwear"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm hover:underline"
                  >
                    KNITWEAR
                  </Link>
                  <Link
                    href="/products?filter=tshirts"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm hover:underline"
                  >
                    T-SHIRTS
                  </Link>
                  <Link
                    href="/products?filter=tops"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm hover:underline"
                  >
                    TOPS
                  </Link>
                  <Link
                    href="/products?filter=shirts"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm hover:underline"
                  >
                    SHIRTS
                  </Link>
                  <Link
                    href="/products?filter=jeans"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm hover:underline"
                  >
                    JEANS
                  </Link>
                  <Link
                    href="/products?filter=trousers"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm hover:underline"
                  >
                    TROUSERS
                  </Link>
                  <Link
                    href="/products?filter=dresses"
                    onClick={() => setIsMenuOpen(false)}
                    className="text-sm hover:underline"
                  >
                    DRESSES
                  </Link>
                </div>
              </div>

              {/* [03] SPECIAL PRICES */}
              <div className="flex gap-6">
                <div className="flex items-start gap-2 pt-0.5">
                  <span className="text-xs text-gray-500">[03]</span>
                  <h3 className="text-sm font-semibold tracking-wider whitespace-nowrap">
                    SPECIAL PRICES <span className="text-red-600 text-xs">NEW</span>
                  </h3>
                </div>
                <Link
                  href="/products?filter=sale"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-sm hover:underline pt-0.5"
                >
                  SALE
                </Link>
              </div>

              {/* User Section */}
              <div className="pt-6 border-t">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <p className="text-sm font-semibold mb-3">{user?.name}</p>
                    {user?.role === 'ADMIN' && (
                      <Link
                        href="/admin"
                        onClick={() => setIsMenuOpen(false)}
                        className="block text-xs hover:underline"
                      >
                        ADMIN DASHBOARD
                      </Link>
                    )}
                    <Link
                      href="/orders"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-xs hover:underline"
                    >
                      MY ORDERS
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-xs hover:underline text-left"
                    >
                      LOG OUT
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-xs hover:underline"
                    >
                      LOG IN
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="block text-xs hover:underline"
                    >
                      CREATE ACCOUNT
                    </Link>
                  </div>
                )}
              </div>
              </div>
            </div>

            {/* RIGHT COLUMN - Featured Images */}
            <div className="col-span-4">
              <div className="space-y-4">
                {/* Featured Image 1 - NEW IN */}
                <Link
                  href="/products?filter=new"
                  onClick={() => setIsMenuOpen(false)}
                  className="block aspect-[4/5] bg-gray-100 hover:opacity-90 transition-opacity relative overflow-hidden group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop"
                    alt="New Collection"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm font-semibold">NEW COLLECTION</p>
                  </div>
                </Link>

                {/* Featured Image 2 - COLLECTION */}
                <Link
                  href="/products?filter=featured"
                  onClick={() => setIsMenuOpen(false)}
                  className="block aspect-[4/5] bg-gray-100 hover:opacity-90 transition-opacity relative overflow-hidden group"
                >
                  <img
                    src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=500&fit=crop"
                    alt="Featured Styles"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                    <p className="text-white text-sm font-semibold">FEATURED STYLES</p>
                  </div>
                </Link>
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

      {/* Spacing for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
