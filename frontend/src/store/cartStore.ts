import { create } from 'zustand';
import { Cart, CartItem, Product } from '@/types';

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (product: Product, quantity: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  removeItem: (itemId: number) => void;
  clearCart: () => void;
  loadFromCart: (cart: Cart) => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  total: 0,

  addItem: (product: Product, quantity: number) => {
    set((state) => {
      const existingItem = state.items.find(item => item.product.id === product.id);
      
      if (existingItem) {
        const updatedItems = state.items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity, itemTotal: (item.quantity + quantity) * product.price }
            : item
        );
        const total = updatedItems.reduce((sum, item) => sum + item.itemTotal, 0);
        return { items: updatedItems, total };
      } else {
        const newItem: CartItem = {
          id: Date.now(),
          product,
          quantity,
          itemTotal: quantity * product.price,
        };
        const items = [...state.items, newItem];
        const total = items.reduce((sum, item) => sum + item.itemTotal, 0);
        return { items, total };
      }
    });
  },

  updateQuantity: (itemId: number, quantity: number) => {
    set((state) => {
      const updatedItems = state.items.map(item =>
        item.id === itemId
          ? { ...item, quantity, itemTotal: quantity * item.product.price }
          : item
      );
      const total = updatedItems.reduce((sum, item) => sum + item.itemTotal, 0);
      return { items: updatedItems, total };
    });
  },

  removeItem: (itemId: number) => {
    set((state) => {
      const items = state.items.filter(item => item.id !== itemId);
      const total = items.reduce((sum, item) => sum + item.itemTotal, 0);
      return { items, total };
    });
  },

  clearCart: () => {
    set({ items: [], total: 0 });
  },

  loadFromCart: (cart: Cart) => {
    set({ items: cart.items, total: cart.total });
  },
}));
