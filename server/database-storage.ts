
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
    this.initializeData();
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
    const result = await db.delete(treatments).where(eq(treatments.id, id)).returning();
    return result.length > 0;
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
    const result = await db.delete(products).where(eq(products.id, id)).returning();
    return result.length > 0;
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
    const result = await db.delete(bookings).where(eq(bookings.id, id)).returning();
    return result.length > 0;
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

  // Gallery Item methods
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

  // Instagram Post methods
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
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((totalRating / reviews.length) * 10) / 10;
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
          tuesday: { closed: false, open: "8:00", close: "17:00" },
          wednesday: { closed: false, open: "8:00", close: "17:00" },
          thursday: { closed: false, open: "8:00", close: "17:00" },
          friday: { closed: false, open: "8:00", close: "17:00" },
          saturday: { closed: false, open: "8:00", close: "17:00" },
          sunday: { closed: false, open: "8:00", close: "17:00" }
        },
        contactInfo: {
          phone: "+44 123 456 7890",
          email: "info@thesculptingart.com",
          address: "123 Beauty Street, London, UK"
        },
        socialMedia: {
          instagram: "@thesculptingart",
          facebook: "The Sculpting Art",
          twitter: "@sculptigart"
        },
        siteContent: {
          heroTitle: "Transform Your Body, Elevate Your Confidence",
          heroSubtitle: "Experience Professional Body Sculpting & Wellness Treatments",
          aboutText: "The Sculpting Art specializes in non-invasive body sculpting treatments that help you achieve your wellness goals."
        }
      };
      const created = await db.insert(websiteSettings).values(defaultSettings).returning();
      return created[0];
    }
    return result[0];
  }

  async updateWebsiteSettings(settings: Partial<InsertWebsiteSettings>): Promise<WebsiteSettings> {
    const existing = await this.getWebsiteSettings();
    const result = await db.update(websiteSettings).set(settings).where(eq(websiteSettings.id, existing.id)).returning();
    return result[0];
  }

  // Payment Session methods
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

  // Initialize with sample data
  private async initializeData(): Promise<void> {
    try {
      // Check if data already exists
      const existingTreatments = await db.select().from(treatments).limit(1);
      if (existingTreatments.length > 0) {
        return; // Data already exists
      }

      // Create admin user
      await db.insert(users).values({
        username: "admin",
        password: "admin123",
        email: "admin@thesculptingart.com",
        fullName: "Admin User",
        role: "admin"
      });

      // Sample treatments
      const treatmentData = [
        {
          slug: "wood-therapy",
          title: "Wood Therapy",
          description: "Non-invasive technique using wooden tools to sculpt the body, break down fat, and stimulate the lymphatic system.",
          price: "120",
          duration: 60,
          image: "images/Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png",
          featured: true
        },
        {
          slug: "cavitation-vacuum",
          title: "Cavitation & Vacuum",
          description: "Powerful, non-invasive treatment using sound waves to break down stubborn fat cells and enhance circulation.",
          price: "150",
          duration: 75,
          image: "images/Screenshot 2025-05-04 154211.png",
          featured: true
        },
        {
          slug: "lymphatic-drainage",
          title: "Lymphatic Drainage",
          description: "Gentle massage technique that stimulates the lymphatic system to reduce water retention and enhance circulation.",
          price: "135",
          duration: 60,
          image: "images/Screenshot 2025-05-04 160111.png",
          featured: true
        },
        {
          slug: "recovery-boost",
          title: "RecoveryBoost",
          description: "Personalized post-op drainage massage designed specifically for post-operative recovery.",
          price: "160",
          duration: 90,
          image: "images/FDAFD339-7FA3-4285-9421-7B79CAA669BF.jpeg",
          featured: false
        },
        {
          slug: "laser-lipo",
          title: "Laser Lipo",
          description: "Non-invasive treatment that uses advanced laser technology to break down stubborn fat cells.",
          price: "180",
          duration: 90,
          image: "images/Before After Beauty Skincare Minimlasit Instagram Post.png",
          featured: false
        }
      ];

      await db.insert(treatments).values(treatmentData);

      // Sample products
      const productData = [
        {
          slug: "waist-trainer-1",
          title: "Waist Trainer",
          description: "Premium quality waist trainer designed for body sculpting and support during workouts.",
          price: "25",
          image: "image_1747338239575.png",
          category: "Waist Trainers",
          featured: true,
          stockQuantity: 15
        },
        {
          slug: "waist-trainer-2",
          title: "Premium Waist Trainer",
          description: "Advanced waist trainer with enhanced compression and comfort for maximum body sculpting results.",
          price: "29.12",
          image: "image_1747337696802.png",
          category: "Waist Trainers",
          featured: true,
          stockQuantity: 12
        }
      ];

      await db.insert(products).values(productData);

      // Sample testimonials
      const testimonialData = [
        {
          name: "Jessica M.",
          treatment: "Wood Therapy Client",
          rating: "5.0",
          content: "After just 4 sessions of wood therapy, the difference in my body is incredible. Not only do I look better, but I feel more confident and energized. The staff is professional, knowledgeable, and truly caring.",
          initials: "JM",
          featured: true
        },
        {
          name: "Robert K.",
          treatment: "RecoveryBoost Client",
          rating: "5.0",
          content: "The lymphatic drainage massage completely transformed my recovery after surgery. The therapist was incredibly attentive to my needs and made the experience comfortable. I'm so grateful for finding this place!",
          initials: "RK",
          featured: true
        },
        {
          name: "Tanya S.",
          treatment: "Cavitation Client",
          rating: "4.5",
          content: "I've tried many treatments for my stubborn belly fat, but nothing worked until I discovered Cavitation & Vacuum therapy at The Sculpting Art. The results are amazing, and the spa environment makes every visit a treat.",
          initials: "TS",
          featured: true
        },
        {
          name: "David L.",
          treatment: "Custom Treatment Plan",
          rating: "5.0",
          content: "The combination of treatments in my custom package has given me results I never thought possible. I've lost inches and gained confidence. The team is amazing at what they do and the environment is so calming.",
          initials: "DL",
          featured: true
        }
      ];

      await db.insert(testimonials).values(testimonialData);

      // Sample gallery items
      const galleryData = [
        {
          title: "Abdominal Sculpting Results",
          category: "Before & After",
          image: "Before After Beauty Skincare Minimlasit Instagram Post.png",
          featured: true
        },
        {
          title: "Facial Contouring Results",
          category: "Before & After",
          image: "Screenshot 2025-05-04 160111.png",
          featured: true
        },
        {
          title: "Full Body Transformation",
          category: "Before & After",
          image: "Screenshot 2025-05-04 154211.png",
          featured: true
        }
      ];

      await db.insert(galleryItems).values(galleryData);

      // Sample Instagram posts
      const instagramData = [
        {
          image: "Before After Beauty Skincare Minimlasit Instagram Post.png",
          likes: 156,
          url: "https://instagram.com/thesculptingartbyel"
        },
        {
          image: "Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png",
          likes: 89,
          url: "https://instagram.com/thesculptingartbyel"
        },
        {
          image: "Beige Nude Aesthetic Feminine Modern Gynecology Health Clinic Branding Logo.png",
          likes: 203,
          url: "https://instagram.com/thesculptingartbyel"
        },
        {
          image: "Screenshot 2025-05-04 154211.png",
          likes: 134,
          url: "https://instagram.com/thesculptingartbyel"
        },
        {
          image: "Before After Beauty Skincare Minimlasit Instagram Post.png",
          likes: 178,
          url: "https://instagram.com/thesculptingartbyel"
        },
        {
          image: "Screenshot 2025-05-04 160111.png",
          likes: 112,
          url: "https://instagram.com/thesculptingartbyel"
        }
      ];

      await db.insert(instagramPosts).values(instagramData);

      // Sample product reviews
      const reviewData = [
        {
          productId: 1,
          customerName: "Sarah J.",
          rating: 5,
          reviewText: "Amazing quality waist trainer! Really helps with posture and gives great support during workouts. Highly recommend!",
          verified: true
        },
        {
          productId: 1,
          customerName: "Emma R.",
          rating: 4,
          reviewText: "Good product, fits well and comfortable to wear. Noticed improvements in my silhouette after a few weeks.",
          verified: true
        },
        {
          productId: 2,
          customerName: "Maria L.",
          rating: 5,
          reviewText: "Excellent waist trainer! The quality is outstanding and it's very comfortable. Perfect for my daily workouts.",
          verified: true
        }
      ];

      await db.insert(productReviews).values(reviewData);

    } catch (error) {
      console.error("Error initializing database data:", error);
    }
  }
}
