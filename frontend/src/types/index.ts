export interface User {
  id: number;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface AuthResponse {
  token?: string;
  id: number;
  name: string;
  email: string;
  role: 'CUSTOMER' | 'ADMIN';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

export interface Category {
  id: number;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  category: Category;
}

export interface ProductsResponse {
  content: Product[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  itemTotal: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  subtotal: number;
  total: number;
}

export interface OrderItem {
  id: number;
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: number;
  userId: number;
  userName: string;
  totalAmount: number;
  status: 'PENDING' | 'PAID' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED';
  paymentMethod: string;
  paymentStatus: 'UNPAID' | 'PAID';
  address: string;
  phone: string;
  createdAt: string;
  items: OrderItem[];
}

export interface CheckoutRequest {
  address: string;
  phone: string;
  paymentMethod: string;
}
