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
          {/* Left Side - Menu Toggle + Brand */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="flex flex-col gap-1.5 p-3 -m-3 hover:opacity-70 transition-opacity"
              aria-label="Menu"
            >
              <span className="w-6 h-0.5 bg-black"></span>
              <span className="w-6 h-0.5 bg-black"></span>
            </button>

            {/* Brand hidden per request */}
          </div>

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
          <div className="border-b border-gray-100">
            <div className="max-w-7xl mx-auto flex items-center gap-8 px-6 py-4">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col gap-1.5 p-3 -m-3 hover:opacity-70 transition-opacity"
                aria-label="Close menu"
              >
                <span className="w-6 h-0.5 bg-black transform rotate-45 translate-y-1"></span>
                <span className="w-6 h-0.5 bg-black transform -rotate-45 -translate-y-0.5"></span>
              </button>
              <h2 className="text-5xl sm:text-6xl font-serif font-semibold tracking-[0.08em] leading-none uppercase">
                LUMINOUSONE
              </h2>
            </div>
          </div>

          {/* 3-Column Layout */}
          <div className="flex-1 min-h-0 overflow-hidden">
            <div className="max-w-7xl mx-auto grid grid-cols-12 gap-12 px-6 py-8 h-full min-h-0">
              {/* LEFT COLUMN - Main Navigation */}
              <div className="col-span-3">
                <nav className="flex flex-col space-y-3 text-3xl font-serif tracking-tight leading-10">
                <Link
                  href="/products?category=women"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:opacity-60 transition-opacity"
                >
                  WOMAN
                </Link>
                <Link
                  href="/products?category=men"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:opacity-60 transition-opacity"
                >
                  MAN
                </Link>
                <Link
                  href="/products?category=kids"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:opacity-60 transition-opacity"
                >
                  KIDS
                </Link>
                <Link
                  href="/products?category=travel"
                  onClick={() => setIsMenuOpen(false)}
                  className="hover:opacity-60 transition-opacity"
                >
                  TRAVEL MODE
                </Link>
                </nav>
              </div>

              {/* MIDDLE COLUMN - Featured Categories */}
              <div className="col-span-5 h-full overflow-y-auto pr-6 border-r border-gray-200 menu-scroll">
                <div className="space-y-10 pt-6 max-w-sm">
              {/* [01] NEW IN */}
              <div className="flex gap-6">
                <div className="flex items-start gap-3 pt-0.5 min-w-[150px]">
                  <span className="w-px h-3 bg-gray-400 mt-1"></span>
                  <span className="text-[11px] text-gray-500 tracking-widest">[01]</span>
                  <h3 className="text-[12px] font-medium tracking-[0.2em] whitespace-nowrap">
                    NEW IN
                  </h3>
                </div>
                <div className="space-y-3 text-[13px] tracking-wide uppercase">
                  <Link
                    href="/products?filter=new"
                    onClick={() => setIsMenuOpen(false)}
                    className="block hover:underline"
                  >
                    THE NEW
                  </Link>
                  <Link
                    href="/products?filter=valentine"
                    onClick={() => setIsMenuOpen(false)}
                    className="block hover:underline text-red-600"
                  >
                    VALENTINE&apos;S DAY
                  </Link>
                  <Link
                    href="/products?filter=featured"
                    onClick={() => setIsMenuOpen(false)}
                    className="block hover:underline"
                  >
                    THE ITEM
                  </Link>
                </div>
              </div>

              {/* [02] COLLECTION */}
              <div className="flex gap-6">
                <div className="flex items-start gap-3 pt-0.5 min-w-[150px]">
                  <span className="w-px h-3 bg-gray-400 mt-1"></span>
                  <span className="text-[11px] text-gray-500 tracking-widest">[02]</span>
                  <h3 className="text-[12px] font-medium tracking-[0.2em] whitespace-nowrap">
                    COLLECTION
                  </h3>
                </div>
                <div className="flex flex-col space-y-3 text-[13px] tracking-wide uppercase">
                  <Link
                    href="/products?filter=jackets"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:underline font-semibold"
                  >
                    JACKETS
                  </Link>
                  <Link
                    href="/products?filter=coats"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:underline"
                  >
                    COATS
                  </Link>
                  <Link
                    href="/products?filter=blazers"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:underline"
                  >
                    BLAZERS
                  </Link>
                  <Link
                    href="/products?filter=knitwear"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:underline"
                  >
                    KNITWEAR
                  </Link>
                  <Link
                    href="/products?filter=tshirts"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:underline"
                  >
                    T-SHIRTS
                  </Link>
                  <Link
                    href="/products?filter=tops"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:underline"
                  >
                    TOPS
                  </Link>
                  <Link
                    href="/products?filter=shirts"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:underline"
                  >
                    SHIRTS
                  </Link>
                  <Link
                    href="/products?filter=jeans"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:underline"
                  >
                    JEANS
                  </Link>
                  <Link
                    href="/products?filter=trousers"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:underline"
                  >
                    TROUSERS
                  </Link>
                  <Link
                    href="/products?filter=dresses"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:underline"
                  >
                    DRESSES
                  </Link>
                </div>
              </div>

              {/* [03] SPECIAL PRICES */}
              <div className="flex gap-6">
                <div className="flex items-start gap-3 pt-0.5 min-w-[150px]">
                  <span className="w-px h-3 bg-gray-400 mt-1"></span>
                  <span className="text-[11px] text-gray-500 tracking-widest">[03]</span>
                  <h3 className="text-[12px] font-medium tracking-[0.2em] whitespace-nowrap">
                    SPECIAL PRICES <span className="text-red-600 text-xs">NEW</span>
                  </h3>
                </div>
                <Link
                  href="/products?filter=sale"
                  onClick={() => setIsMenuOpen(false)}
                  className="block text-[13px] tracking-wide uppercase hover:underline pt-0.5"
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
              <div className="col-span-4 flex justify-end">
                <div className="space-y-4 w-full max-w-[220px] pt-2">
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

      {/* Spacing for fixed navbar */}
      <div className="h-16"></div>
    </>
  );
}
