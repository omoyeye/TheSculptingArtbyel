import {
  users,
  treatments,
  products,
  bookings,
  orders,
  orderItems,
  testimonials,
  galleryItems,
  instagramPosts,
  productReviews,
  websiteSettings,
  paymentSessions,
  contactSubmissions,
  newsletterSubscriptions,
  type User,
  type InsertUser,
  type Treatment,
  type InsertTreatment,
  type Product,
  type InsertProduct,
  type Booking,
  type InsertBooking,
  type Order,
  type InsertOrder,
  type OrderItem,
  type InsertOrderItem,
  type Testimonial,
  type InsertTestimonial,
  type GalleryItem,
  type InsertGalleryItem,
  type InstagramPost,
  type InsertInstagramPost,
  type ProductReview,
  type InsertProductReview,
  type WebsiteSettings,
  type InsertWebsiteSettings,
  type PaymentSession,
  type InsertPaymentSession,
  type ContactSubmission,
  type InsertContactSubmission,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Define the storage interface
export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Treatments
  getTreatments(): Promise<Treatment[]>;
  getTreatment(id: number): Promise<Treatment | undefined>;
  getTreatmentBySlug(slug: string): Promise<Treatment | undefined>;
  createTreatment(treatment: InsertTreatment): Promise<Treatment>;
  updateTreatment(id: number, treatment: Partial<InsertTreatment>): Promise<Treatment | undefined>;
  deleteTreatment(id: number): Promise<boolean>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined>;
  deleteProduct(id: number): Promise<boolean>;
  
  // Bookings
  getBookings(): Promise<Booking[]>;
  getBookingsByUser(userId: number): Promise<Booking[]>;
  getBooking(id: number): Promise<Booking | undefined>;
  createBooking(booking: InsertBooking): Promise<Booking>;
  updateBookingStatus(id: number, status: string): Promise<Booking | undefined>;
  deleteBooking(id: number): Promise<boolean>;
  
  // Orders
  getOrders(): Promise<Order[]>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  getOrder(id: number): Promise<Order | undefined>;
  createOrder(order: InsertOrder): Promise<Order>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  // Order Items
  getOrderItems(orderId: number): Promise<OrderItem[]>;
  createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem>;
  
  // Testimonials
  getTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Gallery
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemsByCategory(category: string): Promise<GalleryItem[]>;
  createGalleryItem(galleryItem: InsertGalleryItem): Promise<GalleryItem>;
  
  // Instagram
  getInstagramPosts(): Promise<InstagramPost[]>;
  createInstagramPost(instagramPost: InsertInstagramPost): Promise<InstagramPost>;
  
  // Product Reviews
  getProductReviews(productId: number): Promise<ProductReview[]>;
  createProductReview(review: InsertProductReview): Promise<ProductReview>;
  getAverageRating(productId: number): Promise<number>;
  
  // Website Settings
  getWebsiteSettings(): Promise<WebsiteSettings>;
  updateWebsiteSettings(settings: Partial<InsertWebsiteSettings>): Promise<WebsiteSettings>;
  
  // Payment Sessions
  createPaymentSession(paymentSession: InsertPaymentSession): Promise<PaymentSession>;
  getPaymentSession(id: number): Promise<PaymentSession | undefined>;
  getPaymentSessionByStripeId(stripeSessionId: string): Promise<PaymentSession | undefined>;
  getPaymentSessionByOrderId(orderId: number): Promise<PaymentSession | undefined>;
  getPaymentSessionByBookingId(bookingId: number): Promise<PaymentSession | undefined>;
  updatePaymentSessionStatus(id: number, status: string): Promise<PaymentSession | undefined>;
  
  // Contact Submissions
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  getContactSubmissions(): Promise<ContactSubmission[]>;
  updateContactSubmissionStatus(id: number, status: string): Promise<ContactSubmission | undefined>;
  
  // Newsletter Subscriptions
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined>;
  updateNewsletterSubscriptionStatus(email: string, status: string): Promise<NewsletterSubscription | undefined>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  constructor() {
    this.initializeData();
  }

  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db
      .insert(users)
      .values(user)
      .returning();
    return newUser;
  }

  async getTreatments(): Promise<Treatment[]> {
    return await db.select().from(treatments);
  }

  async getTreatment(id: number): Promise<Treatment | undefined> {
    const [treatment] = await db.select().from(treatments).where(eq(treatments.id, id));
    return treatment || undefined;
  }

  async getTreatmentBySlug(slug: string): Promise<Treatment | undefined> {
    const [treatment] = await db.select().from(treatments).where(eq(treatments.slug, slug));
    return treatment || undefined;
  }

  async createTreatment(treatment: InsertTreatment): Promise<Treatment> {
    const [newTreatment] = await db
      .insert(treatments)
      .values(treatment)
      .returning();
    return newTreatment;
  }

  async updateTreatment(id: number, treatment: Partial<InsertTreatment>): Promise<Treatment | undefined> {
    const [updatedTreatment] = await db
      .update(treatments)
      .set(treatment)
      .where(eq(treatments.id, id))
      .returning();
    return updatedTreatment || undefined;
  }

  async deleteTreatment(id: number): Promise<boolean> {
    const result = await db.delete(treatments).where(eq(treatments.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getProducts(): Promise<Product[]> {
    return await db.select().from(products);
  }

  async getProduct(id: number): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.id, id));
    return product || undefined;
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product || undefined;
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const [newProduct] = await db
      .insert(products)
      .values(product)
      .returning();
    return newProduct;
  }

  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const [updatedProduct] = await db
      .update(products)
      .set(product)
      .where(eq(products.id, id))
      .returning();
    return updatedProduct || undefined;
  }

  async deleteProduct(id: number): Promise<boolean> {
    const result = await db.delete(products).where(eq(products.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getBookings(): Promise<Booking[]> {
    return await db.select().from(bookings);
  }

  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return await db.select().from(bookings).where(eq(bookings.userId, userId));
  }

  async getBooking(id: number): Promise<Booking | undefined> {
    const [booking] = await db.select().from(bookings).where(eq(bookings.id, id));
    return booking || undefined;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const [newBooking] = await db
      .insert(bookings)
      .values(booking)
      .returning();
    return newBooking;
  }

  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const [updatedBooking] = await db
      .update(bookings)
      .set({ status })
      .where(eq(bookings.id, id))
      .returning();
    return updatedBooking || undefined;
  }

  async deleteBooking(id: number): Promise<boolean> {
    const result = await db.delete(bookings).where(eq(bookings.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getOrders(): Promise<Order[]> {
    return await db.select().from(orders);
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return await db.select().from(orders).where(eq(orders.userId, userId));
  }

  async getOrder(id: number): Promise<Order | undefined> {
    const [order] = await db.select().from(orders).where(eq(orders.id, id));
    return order || undefined;
  }

  async createOrder(order: InsertOrder): Promise<Order> {
    const [newOrder] = await db
      .insert(orders)
      .values(order)
      .returning();
    return newOrder;
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const [updatedOrder] = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    return updatedOrder || undefined;
  }

  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }

  async createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem> {
    const [newOrderItem] = await db
      .insert(orderItems)
      .values(orderItem)
      .returning();
    return newOrderItem;
  }

  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db
      .insert(testimonials)
      .values(testimonial)
      .returning();
    return newTestimonial;
  }

  async getGalleryItems(): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems);
  }

  async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems).where(eq(galleryItems.category, category));
  }

  async createGalleryItem(galleryItem: InsertGalleryItem): Promise<GalleryItem> {
    const [newGalleryItem] = await db
      .insert(galleryItems)
      .values(galleryItem)
      .returning();
    return newGalleryItem;
  }

  async getInstagramPosts(): Promise<InstagramPost[]> {
    return await db.select().from(instagramPosts);
  }

  async createInstagramPost(instagramPost: InsertInstagramPost): Promise<InstagramPost> {
    const [newInstagramPost] = await db
      .insert(instagramPosts)
      .values(instagramPost)
      .returning();
    return newInstagramPost;
  }

  async getProductReviews(productId: number): Promise<ProductReview[]> {
    return await db.select().from(productReviews).where(eq(productReviews.productId, productId));
  }

  async createProductReview(review: InsertProductReview): Promise<ProductReview> {
    const [newReview] = await db
      .insert(productReviews)
      .values(review)
      .returning();
    return newReview;
  }

  async getAverageRating(productId: number): Promise<number> {
    const reviews = await this.getProductReviews(productId);
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return total / reviews.length;
  }

  async getWebsiteSettings(): Promise<WebsiteSettings> {
    const [settings] = await db.select().from(websiteSettings).limit(1);
    if (!settings) {
      // Create default settings if none exist
      const defaultSettings = {
        bookingEnabled: true,
        maintenanceMode: false,
        businessHours: {
          monday: { closed: true },
          tuesday: { closed: false, open: "9:00", close: "17:00" },
          wednesday: { closed: false, open: "9:00", close: "17:00" },
          thursday: { closed: false, open: "9:00", close: "17:00" },
          friday: { closed: false, open: "9:00", close: "17:00" },
          saturday: { closed: false, open: "10:00", close: "16:00" },
          sunday: { closed: true }
        },
        contactInfo: {
          phone: "+44 123 456 7890",
          email: "info@thesculptingart.com",
          address: "Your Business Address"
        }
      };
      
      const [newSettings] = await db
        .insert(websiteSettings)
        .values([defaultSettings])
        .returning();
      return newSettings;
    }
    return settings;
  }

  async updateWebsiteSettings(settings: Partial<InsertWebsiteSettings>): Promise<WebsiteSettings> {
    const [existingSettings] = await db.select().from(websiteSettings).limit(1);
    
    if (!existingSettings) {
      const [newSettings] = await db
        .insert(websiteSettings)
        .values(settings as InsertWebsiteSettings)
        .returning();
      return newSettings;
    }
    
    const [updatedSettings] = await db
      .update(websiteSettings)
      .set(settings)
      .where(eq(websiteSettings.id, existingSettings.id))
      .returning();
    return updatedSettings;
  }

  async createPaymentSession(paymentSession: InsertPaymentSession): Promise<PaymentSession> {
    const [newPaymentSession] = await db
      .insert(paymentSessions)
      .values(paymentSession)
      .returning();
    return newPaymentSession;
  }

  async getPaymentSession(id: number): Promise<PaymentSession | undefined> {
    const [session] = await db.select().from(paymentSessions).where(eq(paymentSessions.id, id));
    return session || undefined;
  }

  async getPaymentSessionByStripeId(stripeSessionId: string): Promise<PaymentSession | undefined> {
    const [session] = await db.select().from(paymentSessions).where(eq(paymentSessions.stripeSessionId, stripeSessionId));
    return session || undefined;
  }

  async getPaymentSessionByOrderId(orderId: number): Promise<PaymentSession | undefined> {
    const [session] = await db.select().from(paymentSessions).where(eq(paymentSessions.orderId, orderId));
    return session || undefined;
  }

  async getPaymentSessionByBookingId(bookingId: number): Promise<PaymentSession | undefined> {
    const [session] = await db.select().from(paymentSessions).where(eq(paymentSessions.bookingId, bookingId));
    return session || undefined;
  }

  async updatePaymentSessionStatus(id: number, status: string): Promise<PaymentSession | undefined> {
    const [updatedSession] = await db
      .update(paymentSessions)
      .set({ status })
      .where(eq(paymentSessions.id, id))
      .returning();
    return updatedSession || undefined;
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db
      .insert(contactSubmissions)
      .values(submission)
      .returning();
    return newSubmission;
  }

  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }

  async updateContactSubmissionStatus(id: number, status: string): Promise<ContactSubmission | undefined> {
    const [updatedSubmission] = await db
      .update(contactSubmissions)
      .set({ status })
      .where(eq(contactSubmissions.id, id))
      .returning();
    return updatedSubmission || undefined;
  }

  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    const [newSubscription] = await db
      .insert(newsletterSubscriptions)
      .values(subscription)
      .returning();
    return newSubscription;
  }

  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return await db.select().from(newsletterSubscriptions);
  }

  async getNewsletterSubscriptionByEmail(email: string): Promise<NewsletterSubscription | undefined> {
    const [subscription] = await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.email, email));
    return subscription || undefined;
  }

  async updateNewsletterSubscriptionStatus(email: string, status: string): Promise<NewsletterSubscription | undefined> {
    const [updatedSubscription] = await db
      .update(newsletterSubscriptions)
      .set({ status })
      .where(eq(newsletterSubscriptions.email, email))
      .returning();
    return updatedSubscription || undefined;
  }

  private async initializeData(): Promise<void> {
    try {
      // Check if admin user already exists
      const adminUser = await this.getUserByUsername("admin");
      if (!adminUser) {
        await db.insert(users).values({
          username: "admin",
          password: "admin123",
          email: "admin@thesculptingart.com",
          fullName: "Admin User",
          role: "admin"
        });
      }

      // Check if treatments already exist
      const existingTreatments = await this.getTreatments();
      if (existingTreatments.length === 0) {
        const treatmentData = [
          {
            slug: "body-contouring",
            title: "Body Contouring",
            description: "Advanced non-invasive body shaping treatment",
            price: "150.00",
            duration: 60,
            image: "/images/body-contouring.jpg",
            featured: true
          },
          {
            slug: "cellulite-reduction",
            title: "Cellulite Reduction",
            description: "Targeted cellulite treatment for smoother skin",
            price: "120.00",
            duration: 45,
            image: "/images/cellulite-reduction.jpg",
            featured: false
          }
        ];
        await db.insert(treatments).values(treatmentData);
      }

      // Check if products already exist
      const existingProducts = await this.getProducts();
      if (existingProducts.length === 0) {
        const productData = [
          {
            slug: "waist-trainer-basic",
            title: "Premium Waist Trainer",
            description: "High-quality waist training belt for daily use",
            price: "25.00",
            image: "/images/waist-trainer-basic.jpg",
            featured: true,
            category: "waist-trainers",
            badge: "Popular",
            stockQuantity: 50
          },
          {
            slug: "waist-trainer-deluxe",
            title: "Deluxe Waist Trainer",
            description: "Professional-grade waist trainer with enhanced support",
            price: "29.12",
            image: "/images/waist-trainer-deluxe.jpg",
            featured: true,
            category: "waist-trainers",
            badge: "Best Seller",
            stockQuantity: 30
          }
        ];
        await db.insert(products).values(productData);
      }

      // Initialize testimonials
      const existingTestimonials = await this.getTestimonials();
      if (existingTestimonials.length === 0) {
        const testimonialData = [
          {
            name: "Sarah Johnson",
            treatment: "Body Contouring",
            rating: "5",
            content: "Amazing results! I'm so happy with my transformation.",
            initials: "SJ",
            featured: true
          },
          {
            name: "Emma Wilson",
            treatment: "Cellulite Reduction",
            rating: "5",
            content: "Professional service and incredible results.",
            initials: "EW",
            featured: true
          }
        ];
        await db.insert(testimonials).values(testimonialData);
      }

      // Initialize gallery items
      const existingGallery = await this.getGalleryItems();
      if (existingGallery.length === 0) {
        const galleryData = [
          {
            title: "Before & After - Body Contouring",
            image: "/images/gallery-1.jpg",
            category: "before-after",
            featured: true
          },
          {
            title: "Treatment Room",
            image: "/images/gallery-2.jpg",
            category: "facilities",
            featured: false
          }
        ];
        await db.insert(galleryItems).values(galleryData);
      }

      // Initialize Instagram posts
      const existingInstagram = await this.getInstagramPosts();
      if (existingInstagram.length === 0) {
        const instagramData = [
          {
            image: "/images/instagram-1.jpg",
            likes: 45,
            url: "https://instagram.com/p/example1"
          },
          {
            image: "/images/instagram-2.jpg",
            likes: 62,
            url: "https://instagram.com/p/example2"
          }
        ];
        await db.insert(instagramPosts).values(instagramData);
      }

      // Initialize product reviews
      const existingReviews = await db.select().from(productReviews);
      if (existingReviews.length === 0) {
        const products = await this.getProducts();
        if (products.length > 0) {
          const reviewData = [
            {
              productId: products[0].id,
              rating: 5,
              customerName: "Lisa M.",
              reviewText: "Excellent quality waist trainer! Very comfortable.",
              verified: true
            },
            {
              productId: products[0].id,
              rating: 4,
              customerName: "Anna K.",
              reviewText: "Good product, fast delivery.",
              verified: true
            }
          ];
          await db.insert(productReviews).values(reviewData);
        }
      }

      console.log("Database initialized with sample data");
    } catch (error) {
      console.error("Error initializing database:", error);
    }
  }
}

export const storage = new DatabaseStorage();