
import { z } from "zod";
import { pgTable, serial, text, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// Database tables using Drizzle ORM
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  fullName: text("full_name").notNull(),
  role: text("role").notNull().default("customer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const treatments = pgTable("treatments", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: integer("duration").notNull(),
  image: text("image").notNull(),
  featured: boolean("featured").default(false),
});

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
  stockQuantity: integer("stock_quantity").default(0),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  treatmentId: integer("treatment_id").references(() => treatments.id).notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  status: text("status").notNull().default("pending"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  status: text("status").notNull().default("pending"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id).notNull(),
  productId: integer("product_id").references(() => products.id),
  quantity: integer("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  treatment: text("treatment").notNull(),
  rating: decimal("rating", { precision: 3, scale: 1 }).notNull(),
  content: text("content").notNull(),
  initials: text("initials").notNull(),
  featured: boolean("featured").default(false),
});

export const galleryItems = pgTable("gallery_items", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  image: text("image").notNull(),
  featured: boolean("featured").default(false),
});

export const instagramPosts = pgTable("instagram_posts", {
  id: serial("id").primaryKey(),
  image: text("image").notNull(),
  likes: integer("likes").default(0),
  url: text("url"),
});

export const productReviews = pgTable("product_reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id").references(() => products.id).notNull(),
  customerName: text("customer_name").notNull(),
  rating: integer("rating").notNull(),
  reviewText: text("review_text").notNull(),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const websiteSettings = pgTable("website_settings", {
  id: serial("id").primaryKey(),
  bookingEnabled: boolean("booking_enabled").default(true),
  maintenanceMode: boolean("maintenance_mode").default(false),
  businessHours: jsonb("business_hours").notNull(),
  contactInfo: jsonb("contact_info").notNull(),
  socialMedia: jsonb("social_media").notNull(),
  siteContent: jsonb("site_content").notNull(),
});

// New table for Stripe payment sessions
export const paymentSessions = pgTable("payment_sessions", {
  id: serial("id").primaryKey(),
  orderId: integer("order_id").references(() => orders.id),
  bookingId: integer("booking_id").references(() => bookings.id),
  stripeSessionId: text("stripe_session_id").notNull(),
  stripePaymentUrl: text("stripe_payment_url").notNull(),
  status: text("status").notNull().default("pending"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  bookings: many(bookings),
  orders: many(orders),
}));

export const treatmentsRelations = relations(treatments, ({ many }) => ({
  bookings: many(bookings),
}));

export const productsRelations = relations(products, ({ many }) => ({
  orderItems: many(orderItems),
  reviews: many(productReviews),
}));

export const ordersRelations = relations(orders, ({ one, many }) => ({
  user: one(users, {
    fields: [orders.userId],
    references: [users.id],
  }),
  items: many(orderItems),
  paymentSession: one(paymentSessions, {
    fields: [orders.id],
    references: [paymentSessions.orderId],
  }),
}));

export const bookingsRelations = relations(bookings, ({ one }) => ({
  user: one(users, {
    fields: [bookings.userId],
    references: [users.id],
  }),
  treatment: one(treatments, {
    fields: [bookings.treatmentId],
    references: [treatments.id],
  }),
  paymentSession: one(paymentSessions, {
    fields: [bookings.id],
    references: [paymentSessions.bookingId],
  }),
}));

export const orderItemsRelations = relations(orderItems, ({ one }) => ({
  order: one(orders, {
    fields: [orderItems.orderId],
    references: [orders.id],
  }),
  product: one(products, {
    fields: [orderItems.productId],
    references: [products.id],
  }),
}));

export const productReviewsRelations = relations(productReviews, ({ one }) => ({
  product: one(products, {
    fields: [productReviews.productId],
    references: [products.id],
  }),
}));

export const paymentSessionsRelations = relations(paymentSessions, ({ one }) => ({
  order: one(orders, {
    fields: [paymentSessions.orderId],
    references: [orders.id],
  }),
  booking: one(bookings, {
    fields: [paymentSessions.bookingId],
    references: [bookings.id],
  }),
}));

// TypeScript types inferred from schema
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export type Treatment = typeof treatments.$inferSelect;
export type InsertTreatment = typeof treatments.$inferInsert;

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

export type OrderItem = typeof orderItems.$inferSelect;
export type InsertOrderItem = typeof orderItems.$inferInsert;

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

export type GalleryItem = typeof galleryItems.$inferSelect;
export type InsertGalleryItem = typeof galleryItems.$inferInsert;

export type InstagramPost = typeof instagramPosts.$inferSelect;
export type InsertInstagramPost = typeof instagramPosts.$inferInsert;

export type ProductReview = typeof productReviews.$inferSelect;
export type InsertProductReview = typeof productReviews.$inferInsert;

export type WebsiteSettings = typeof websiteSettings.$inferSelect;
export type InsertWebsiteSettings = typeof websiteSettings.$inferInsert;

export type PaymentSession = typeof paymentSessions.$inferSelect;
export type InsertPaymentSession = typeof paymentSessions.$inferInsert;
