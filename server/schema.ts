
import { z } from "zod";
// import { pgTable, serial, text, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { mysqlTable, int, varchar, text, boolean, timestamp, decimal, json} from "drizzle-orm/mysql-core"

// Database tables using Drizzle ORM
export const users = mysqlTable("users", {
  id: int().primaryKey().autoincrement(),
  username: varchar("username",{ length: 200 }).notNull().unique(),
  password: varchar("password",{ length: 255 }).notNull(),
  email: varchar("email",{ length: 100 }).notNull().unique(),
  fullName: varchar("full_name",{ length: 255 }).notNull(),
  role: varchar("role",{ length: 255 }).notNull().default("customer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const treatments = mysqlTable("treatments", {
  id: int().primaryKey().autoincrement(),
  slug: varchar("slug",{ length: 200 }).notNull().unique(),
  title: varchar("title",{ length: 255 }).notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  duration: int("duration").notNull(),
  image: varchar("image",{ length: 255 }).notNull(),
  featured: boolean("featured").default(false),
});

export const products = mysqlTable("products", {
  id: int().primaryKey().autoincrement(),
  slug: varchar("slug",{ length: 200 }).notNull().unique(),
  title: varchar("title",{ length: 255 }).notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image: varchar("image",{ length: 255 }).notNull(),
  category: varchar("category",{ length: 200 }).notNull(),
  badge: varchar("badge",{ length: 200 }),
  featured: boolean("featured").default(false),
  stockQuantity: int("stock_quantity").default(0),
});

export const bookings = mysqlTable("bookings", {
  id: int().primaryKey().autoincrement(),
  userId: int("user_id").references(() => users.id),
  treatmentId: int("treatment_id").references(() => treatments.id).notNull(),
  date: varchar("date",{ length: 100 }).notNull(),
  time: varchar("time", { length: 100 }).notNull(),
  status: varchar("status", { length: 100 }).notNull().default("pending"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orders = mysqlTable("orders", {
  id: int().primaryKey().autoincrement(),
  userId: int("user_id").references(() => users.id),
  status: varchar("status",{ length: 55 }).notNull().default("pending"),
  total: decimal("total", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const orderItems = mysqlTable("order_items", {
  id: int().primaryKey().autoincrement(),
  orderId: int("order_id").references(() => orders.id).notNull(),
  productId: int("product_id").references(() => products.id),
  quantity: int("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});

export const testimonials = mysqlTable("testimonials", {
  id: int().primaryKey().autoincrement(),
  name: varchar("name",{ length: 200 }).notNull(),
  treatment: text("treatment").notNull(),
  rating: decimal("rating", { precision: 3, scale: 1 }).notNull(),
  content: text("content").notNull(),
  initials: varchar("initials",{ length: 100 }).notNull(),
  featured: boolean("featured").default(false),
});

export const galleryItems = mysqlTable("gallery_items", {
  id: int().primaryKey().autoincrement(),
  title: varchar("title", { length: 255 }).notNull(),
  category: varchar("category",{ length: 200 }).notNull(),
  image: varchar("image",{ length: 255 }).notNull(),
  featured: boolean("featured").default(false),
});

export const instagramPosts = mysqlTable("instagram_posts", {
  id: int().primaryKey().autoincrement(),
  image: text("image").notNull(),
  likes: int("likes").default(0),
  url: text("url"),
});

export const productReviews = mysqlTable("product_reviews", {
  id: int().primaryKey().autoincrement(),
  productId: int("product_id").references(() => products.id).notNull(),
  customerName: varchar("customer_name",{ length: 255 }).notNull(),
  rating: int("rating").notNull(),
  reviewText: text("review_text").notNull(),
  verified: boolean("verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const websiteSettings = mysqlTable("website_settings", {
  id: int().primaryKey().autoincrement(),
  bookingEnabled: boolean("booking_enabled").default(true),
  maintenanceMode: boolean("maintenance_mode").default(false),
  businessHours: json("business_hours").notNull(),
  contactInfo: json("contact_info").notNull(),
  socialMedia: json("social_media").notNull(),
  siteContent: json("site_content").notNull(),
});

// New table for Stripe payment sessions
export const paymentSessions = mysqlTable("payment_sessions", {
  id: int().primaryKey().autoincrement(),
  orderId: int("order_id").references(() => orders.id),
  bookingId: int("booking_id").references(() => bookings.id),
  stripeSessionId: text("stripe_session_id").notNull(),
  stripePaymentUrl: text("stripe_payment_url").notNull(),
  status: text("status").notNull().default("pending"),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

// Contact form submissions
export const contactSubmissions = mysqlTable("contact_submissions", {
  id: int().primaryKey().autoincrement(),
  name: varchar("name",{ length: 255 }).notNull(),
  email: varchar("email",{ length: 100 }).notNull(),
  phone: text("phone").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("new"), // new, read, replied
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Newsletter subscriptions
export const newsletterSubscriptions = mysqlTable("newsletter_subscriptions", {
  id: int().primaryKey().autoincrement(),
  email: varchar("email",{ length: 100 }).notNull().unique(),
  status: text("status").notNull().default("active"), // active, unsubscribed
  subscribedAt: timestamp("subscribed_at").defaultNow().notNull(),
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

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;
export type InsertNewsletterSubscription = typeof newsletterSubscriptions.$inferInsert;
