import { z } from "zod";

// Simple type definitions for the in-memory storage system
// These types match the data structures used in the application

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: Date;
}

export interface Treatment {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  image: string;
  featured?: boolean;
}

export interface Product {
  id: number;
  slug: string;
  title: string;
  description: string;
  price: number;
  image: string;
  category: string;
  badge?: string;
  featured?: boolean;
  stockQuantity: number;
}

export interface Booking {
  id: number;
  userId?: number;
  treatmentId: number;
  date: string;
  time: string;
  status: string;
  price: number;
  createdAt: Date;
}

export interface Order {
  id: number;
  userId?: number;
  status: string;
  total: number;
  createdAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  price: number;
}

export interface Testimonial {
  id: number;
  name: string;
  treatment: string;
  rating: number;
  content: string;
  initials: string;
  featured?: boolean;
}

export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  featured?: boolean;
}

export interface InstagramPost {
  id: number;
  image: string;
  likes: number;
  url?: string;
}

// Insert types (for creating new records)
export type InsertUser = Omit<User, 'id' | 'createdAt'>;
export type InsertTreatment = Omit<Treatment, 'id'>;
export type InsertProduct = Omit<Product, 'id'>;
export type InsertBooking = Omit<Booking, 'id' | 'createdAt'>;
export type InsertOrder = Omit<Order, 'id' | 'createdAt'>;
export type InsertOrderItem = Omit<OrderItem, 'id'>;
export type InsertTestimonial = Omit<Testimonial, 'id'>;
export type InsertGalleryItem = Omit<GalleryItem, 'id'>;
export type InsertInstagramPost = Omit<InstagramPost, 'id'>;
