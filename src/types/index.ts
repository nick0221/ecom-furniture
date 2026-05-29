export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  material: string;
  color: string;
  dimensions: { width: number; height: number; depth: number };
  weight: number;
  rating: number;
  reviewCount: number;
  inStock: boolean;
  featured: boolean;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  avatar: string;
  rating: number;
  date: string;
  comment: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  color?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered";
  date: string;
  shippingAddress: ShippingAddress;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export type SortOption = "price-asc" | "price-desc" | "newest" | "rating";

export interface FilterState {
  category: string[];
  material: string[];
  color: string[];
  priceRange: [number, number];
  search: string;
  sort: SortOption;
}
