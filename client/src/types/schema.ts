// Types that match the schema definitions from the server
export interface User {
  id: number;
  username: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
}

export interface Treatment {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: string | number;
  duration: number;
  image: string;
  featured: boolean | null;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: string | number;
  image: string;
  category: string;
  badge?: string | null;
  featured: boolean | null;
  stockQuantity: number;
}

export interface Booking {
  id: number;
  userId: number | null;
  treatmentId: number;
  date: string;
  time: string;
  status: string;
  price: string | number;
  createdAt: string;
}

export interface Order {
  id: number;
  userId: number | null;
  status: string;
  total: string | number;
  createdAt: string;
  items?: OrderItem[];
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: string | number;
}

export interface Testimonial {
  id: number;
  name: string;
  treatment: string;
  rating: string | number;
  content: string;
  initials: string;
  featured: boolean | null;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  featured: boolean | null;
}

export interface InstagramPost {
  id: number;
  image: string;
  likes: number;
  url: string | null;
}