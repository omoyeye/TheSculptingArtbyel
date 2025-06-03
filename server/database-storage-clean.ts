import { db } from "./db";
import { eq, desc, and } from "drizzle-orm";
import { 
  users, treatments, products, bookings, orders, orderItems, 
  testimonials, galleryItems, instagramPosts, productReviews, 
  websiteSettings, paymentSessions 
} from "@shared/schema";
import type { 
  User, InsertUser, Treatment, InsertTreatment, Product, InsertProduct,
  Booking, InsertBooking, Order, InsertOrder, OrderItem, InsertOrderItem,
  Testimonial, InsertTestimonial, GalleryItem, InsertGalleryItem,
  InstagramPost, InsertInstagramPost, ProductReview, InsertProductReview,
  WebsiteSettings, InsertWebsiteSettings, PaymentSession, InsertPaymentSession
} from "@shared/schema";
import { IStorage } from "./storage";

export class DatabaseStorage implements IStorage {
  constructor() {
    // Database is already initialized with data via SQL
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Treatment methods
  async getTreatments(): Promise<Treatment[]> {
    return await db.select().from(treatments).orderBy(treatments.id);
  }

  async getTreatment(id: number): Promise<Treatment | undefined> {
    const result = await db.select().from(treatments).where(eq(treatments.id, id)).limit(1);
    return result[0];
  }

  async getTreatmentBySlug(slug: string): Promise<Treatment | undefined> {
    const result = await db.select().from(treatments).where(eq(treatments.slug, slug)).limit(1);
    return result[0];
  }

  async createTreatment(treatment: InsertTreatment): Promise<Treatment> {
    const result = await db.insert(treatments).values(treatment).returning();
    return result[0];
  }

  async updateTreatment(id: number, treatment: Partial<InsertTreatment>): Promise<Treatment | undefined> {
    const result = await db.update(treatments).set(treatment).where(eq(treatments.id, id)).returning();
    return result[0];
  }

  async deleteTreatment(id: number): Promise<boolean> {
    const result = await db.delete(treatments).where(eq(treatments.id, id));
    return result.rowCount > 0;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return await db.select().from(products).orderBy(products.id);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.id, id)).limit(1);
    return result[0];
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
    return result[0];
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const result = await db.insert(products).values(product).returning();
    return result[0];
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const result = await db.update(products).set(product).where(eq(products.id, id)).returning();
    return result[0];
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return result.rowCount > 0;
  }

  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings).orderBy(desc(bookings.createdAt));
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId)).orderBy(desc(bookings.createdAt));
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const result = await db.select().from(bookings).where(eq(bookings.id, id)).limit(1);
    return result[0];
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const result = await db.insert(bookings).values(booking).returning();
    return result[0];
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const result = await db.update(bookings).set({ status }).where(eq(bookings.id, id)).returning();
    return result[0];
  }

  async deleteBooking(id: number): Promise<boolean> {
    const result = await db.delete(bookings).where(eq(bookings.id, id));
    return result.rowCount > 0;
  }

  // Order methods
  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders).orderBy(desc(orders.createdAt));
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.userId, userId)).orderBy(desc(orders.createdAt));
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    return result[0];
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values(order).returning();
    return result[0];
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const result = await db.update(orders).set({ status }).where(eq(orders.id, id)).returning();
    return result[0];
  }

  // Order Item methods
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem> {
    const result = await db.insert(orderItems).values(orderItem).returning();
    return result[0];
  }

  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials).orderBy(testimonials.id);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const result = await db.insert(testimonials).values(testimonial).returning();
    return result[0];
  }

  // Gallery methods
  async getGalleryItems(): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems).orderBy(galleryItems.id);
  }

  async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems).where(eq(galleryItems.category, category));
  }

  async createGalleryItem(galleryItem: InsertGalleryItem): Promise<GalleryItem> {
    const result = await db.insert(galleryItems).values(galleryItem).returning();
    return result[0];
  }

  // Instagram methods
  async getInstagramPosts(): Promise<InstagramPost[]> {
    return await db.select().from(instagramPosts).orderBy(instagramPosts.id);
  }

  async createInstagramPost(instagramPost: InsertInstagramPost): Promise<InstagramPost> {
    const result = await db.insert(instagramPosts).values(instagramPost).returning();
    return result[0];
  }

  // Product Review methods
  async getProductReviews(productId: number): Promise<ProductReview[]> {
    return await db.select().from(productReviews).where(eq(productReviews.productId, productId)).orderBy(desc(productReviews.createdAt));
  }

  async createProductReview(review: InsertProductReview): Promise<ProductReview> {
    const result = await db.insert(productReviews).values(review).returning();
    return result[0];
  }

  async getAverageRating(productId: number): Promise<number> {
    const reviews = await this.getProductReviews(productId);
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / reviews.length;
  }

  // Website Settings methods
  async getWebsiteSettings(): Promise<WebsiteSettings> {
    const result = await db.select().from(websiteSettings).limit(1);
    if (result.length === 0) {
      // Create default settings if none exist
      const defaultSettings = {
        bookingEnabled: true,
        maintenanceMode: false,
        businessHours: {
          monday: { closed: true },
          tuesday: { open: "8:00", close: "17:00" },
          wednesday: { open: "8:00", close: "17:00" },
          thursday: { open: "8:00", close: "17:00" },
          friday: { open: "8:00", close: "17:00" },
          saturday: { open: "8:00", close: "17:00" },
          sunday: { open: "8:00", close: "17:00" }
        },
        contactInfo: {
          phone: "+44 123 456 7890",
          email: "info@thesculptingart.com",
          address: "123 Beauty Street, London, UK"
        },
        socialMedia: {
          instagram: "https://instagram.com/thesculptingart",
          facebook: "https://facebook.com/thesculptingart",
          tiktok: "https://tiktok.com/@thesculptingart"
        },
        siteContent: {
          depositAmount: 20,
          cancellationPolicy: "24 hours notice required",
          welcomeMessage: "Welcome to The Sculpting Art - Your journey to beauty begins here"
        }
      };
      const created = await db.insert(websiteSettings).values(defaultSettings).returning();
      return created[0];
    }
    return result[0];
  }

  async updateWebsiteSettings(settings: Partial<InsertWebsiteSettings>): Promise<WebsiteSettings> {
    const result = await db.update(websiteSettings).set(settings).returning();
    return result[0];
  }

  // Payment Session methods for Stripe integration
  async createPaymentSession(paymentSession: InsertPaymentSession): Promise<PaymentSession> {
    const result = await db.insert(paymentSessions).values(paymentSession).returning();
    return result[0];
  }

  async getPaymentSession(id: number): Promise<PaymentSession | undefined> {
    const result = await db.select().from(paymentSessions).where(eq(paymentSessions.id, id)).limit(1);
    return result[0];
  }

  async getPaymentSessionByStripeId(stripeSessionId: string): Promise<PaymentSession | undefined> {
    const result = await db.select().from(paymentSessions).where(eq(paymentSessions.stripeSessionId, stripeSessionId)).limit(1);
    return result[0];
  }

  async getPaymentSessionByOrderId(orderId: number): Promise<PaymentSession | undefined> {
    const result = await db.select().from(paymentSessions).where(eq(paymentSessions.orderId, orderId)).limit(1);
    return result[0];
  }

  async getPaymentSessionByBookingId(bookingId: number): Promise<PaymentSession | undefined> {
    const result = await db.select().from(paymentSessions).where(eq(paymentSessions.bookingId, bookingId)).limit(1);
    return result[0];
  }

  async updatePaymentSessionStatus(id: number, status: string): Promise<PaymentSession | undefined> {
    const result = await db.update(paymentSessions).set({ status }).where(eq(paymentSessions.id, id)).returning();
    return result[0];
  }
}