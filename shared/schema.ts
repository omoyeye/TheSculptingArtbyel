import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users Table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("customer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

// Treatments Table
export const treatments = pgTable("treatments", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: integer("duration").notNull(), // in minutes
  image: text("image").notNull(),
  featured: boolean("featured").default(false),
});

export const insertTreatmentSchema = createInsertSchema(treatments).omit({
  id: true,
});

// Products Table
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image").notNull(),
  category: text("category").notNull(),
  badge: text("badge"),
  featured: boolean("featured").default(false),
  stockQuantity: integer("stock_quantity").notNull().default(0),
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

// Bookings Table
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  treatmentId: integer("treatment_id").references(() => treatments.id).notNull(),
  date: text("date").notNull(), // stored as YYYY-MM-DD
  time: text("time").notNull(), // stored as HH:MM AM/PM
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookingSchema = createInsertSchema(bookings).omit({
  id: true,
  createdAt: true,
});

// Orders Table
export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  status: text("status").notNull().default("pending"), // pending, processing, shipped, completed, cancelled
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

// Order Items Table
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  productId: integer("product_id").references(() => products.id).notNull(),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export const insertOrderItemSchema = createInsertSchema(orderItems).omit({
  id: true,
});

// Testimonials Table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  treatment: text("treatment").notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  content: text("content").notNull(),
  initials: text("initials").notNull(),
  featured: boolean("featured").default(false),
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
});

// Gallery Items Table
export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  featured: boolean("featured").default(false),
});

export const insertGalleryItemSchema = createInsertSchema(galleryItems).omit({
  id: true,
});

// Instagram Posts Table
export const instagramPosts = pgTable("instagram_posts", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  likes: integer("likes").notNull().default(0),
  url: text("url"),
});

export const insertInstagramPostSchema = createInsertSchema(instagramPosts).omit({
  id: true,
});

// Type Exports
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Treatment = typeof treatments.$inferSelect;
export type InsertTreatment = z.infer<typeof insertTreatmentSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = z.infer<typeof insertOrderItemSchema>;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = z.infer<typeof insertGalleryItemSchema>;

export type InstagramPost = typeof instagramPosts.$inferSelect;
export type InsertInstagramPost = z.infer<typeof insertInstagramPostSchema>;
