import { 
  type User, type InsertUser,
  type Treatment, type InsertTreatment,
  type Product, type InsertProduct,
  type Booking, type InsertBooking,
  type Order, type InsertOrder,
  type OrderItem, type InsertOrderItem,
  type Testimonial, type InsertTestimonial,
  type GalleryItem, type InsertGalleryItem,
  type InstagramPost, type InsertInstagramPost,
  type ProductReview, type InsertProductReview,
  type WebsiteSettings, type InsertWebsiteSettings,
  type PaymentSession, type InsertPaymentSession
} from "@shared/schema";

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
  
  // Gallery Items
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemsByCategory(category: string): Promise<GalleryItem[]>;
  createGalleryItem(galleryItem: InsertGalleryItem): Promise<GalleryItem>;
  
  // Instagram Posts
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
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private treatments: Map<number, Treatment>;
  private products: Map<number, Product>;
  private bookings: Map<number, Booking>;
  private orders: Map<number, Order>;
  private orderItems: Map<number, OrderItem>;
  private testimonials: Map<number, Testimonial>;
  private galleryItems: Map<number, GalleryItem>;
  private instagramPosts: Map<number, InstagramPost>;
  private productReviews: Map<number, ProductReview>;
  private websiteSettings!: WebsiteSettings;
  
  private userIdCounter: number;
  private treatmentIdCounter: number;
  private productIdCounter: number;
  private bookingIdCounter: number;
  private orderIdCounter: number;
  private orderItemIdCounter: number;
  private testimonialIdCounter: number;
  private galleryItemIdCounter: number;
  private instagramPostIdCounter: number;
  private productReviewIdCounter: number;
  
  constructor() {
    this.users = new Map();
    this.treatments = new Map();
    this.products = new Map();
    this.bookings = new Map();
    this.orders = new Map();
    this.orderItems = new Map();
    this.testimonials = new Map();
    this.galleryItems = new Map();
    this.instagramPosts = new Map();
    this.productReviews = new Map();
    
    this.userIdCounter = 1;
    this.treatmentIdCounter = 1;
    this.productIdCounter = 1;
    this.bookingIdCounter = 1;
    this.orderIdCounter = 1;
    this.orderItemIdCounter = 1;
    this.testimonialIdCounter = 1;
    this.galleryItemIdCounter = 1;
    this.instagramPostIdCounter = 1;
    this.productReviewIdCounter = 1;
    
    // Initialize website settings
    this.websiteSettings = {
      id: 1,
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
    
    // Initialize with sample data
    this.initializeData();
  }
  
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }
  
  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username.toLowerCase() === username.toLowerCase()
    );
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email.toLowerCase() === email.toLowerCase()
    );
  }
  
  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const newUser: User = { 
      ...user, 
      id,
      createdAt: new Date()
    };
    this.users.set(id, newUser);
    return newUser;
  }
  
  // Treatment methods
  async getTreatments(): Promise<Treatment[]> {
    return Array.from(this.treatments.values());
  }
  
  async getTreatment(id: number): Promise<Treatment | undefined> {
    return this.treatments.get(id);
  }
  
  async getTreatmentBySlug(slug: string): Promise<Treatment | undefined> {
    return Array.from(this.treatments.values()).find(
      (treatment) => treatment.slug === slug
    );
  }
  
  async createTreatment(treatment: InsertTreatment): Promise<Treatment> {
    const id = this.treatmentIdCounter++;
    const newTreatment: Treatment = { ...treatment, id };
    this.treatments.set(id, newTreatment);
    return newTreatment;
  }
  
  async updateTreatment(id: number, treatment: Partial<InsertTreatment>): Promise<Treatment | undefined> {
    const existingTreatment = this.treatments.get(id);
    if (!existingTreatment) return undefined;
    
    const updatedTreatment = { ...existingTreatment, ...treatment };
    this.treatments.set(id, updatedTreatment);
    return updatedTreatment;
  }
  
  async deleteTreatment(id: number): Promise<boolean> {
    return this.treatments.delete(id);
  }
  
  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }
  
  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
  
  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(
      (product) => product.slug === slug
    );
  }
  
  async createProduct(product: InsertProduct): Promise<Product> {
    const id = this.productIdCounter++;
    const newProduct: Product = { ...product, id };
    this.products.set(id, newProduct);
    return newProduct;
  }
  
  async updateProduct(id: number, product: Partial<InsertProduct>): Promise<Product | undefined> {
    const existingProduct = this.products.get(id);
    if (!existingProduct) return undefined;
    
    const updatedProduct = { ...existingProduct, ...product };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }
  
  async deleteProduct(id: number): Promise<boolean> {
    return this.products.delete(id);
  }
  
  // Booking methods
  async getBookings(): Promise<Booking[]> {
    return Array.from(this.bookings.values());
  }
  
  async getBookingsByUser(userId: number): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.userId === userId
    );
  }
  
  async getBooking(id: number): Promise<Booking | undefined> {
    return this.bookings.get(id);
  }
  
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.bookingIdCounter++;
    const newBooking: Booking = { 
      ...booking, 
      id,
      createdAt: new Date()
    };
    this.bookings.set(id, newBooking);
    return newBooking;
  }
  
  async updateBookingStatus(id: number, status: string): Promise<Booking | undefined> {
    const booking = this.bookings.get(id);
    if (!booking) return undefined;
    
    const updatedBooking = { ...booking, status };
    this.bookings.set(id, updatedBooking);
    return updatedBooking;
  }
  
  async deleteBooking(id: number): Promise<boolean> {
    return this.bookings.delete(id);
  }
  
  // Order methods
  async getOrders(): Promise<Order[]> {
    return Array.from(this.orders.values());
  }
  
  async getOrdersByUser(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    );
  }
  
  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
  
  async createOrder(order: InsertOrder): Promise<Order> {
    const id = this.orderIdCounter++;
    const newOrder: Order = { 
      ...order, 
      id,
      createdAt: new Date()
    };
    this.orders.set(id, newOrder);
    return newOrder;
  }
  
  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
  
  // Order Item methods
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return Array.from(this.orderItems.values()).filter(
      (item) => item.orderId === orderId
    );
  }
  
  async createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem> {
    const id = this.orderItemIdCounter++;
    const newOrderItem: OrderItem = { ...orderItem, id };
    this.orderItems.set(id, newOrderItem);
    return newOrderItem;
  }
  
  // Testimonial methods
  async getTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialIdCounter++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  
  // Gallery Item methods
  async getGalleryItems(): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values());
  }
  
  async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
    return Array.from(this.galleryItems.values()).filter(
      (item) => item.category === category
    );
  }
  
  async createGalleryItem(galleryItem: InsertGalleryItem): Promise<GalleryItem> {
    const id = this.galleryItemIdCounter++;
    const newGalleryItem: GalleryItem = { ...galleryItem, id };
    this.galleryItems.set(id, newGalleryItem);
    return newGalleryItem;
  }
  
  // Instagram Post methods
  async getInstagramPosts(): Promise<InstagramPost[]> {
    return Array.from(this.instagramPosts.values());
  }
  
  async createInstagramPost(instagramPost: InsertInstagramPost): Promise<InstagramPost> {
    const id = this.instagramPostIdCounter++;
    const newInstagramPost: InstagramPost = { ...instagramPost, id };
    this.instagramPosts.set(id, newInstagramPost);
    return newInstagramPost;
  }
  
  // Initialize with sample data
  private initializeData(): void {
    // Sample treatments
    this.createTreatment({
      slug: "wood-therapy",
      title: "Wood Therapy",
      description: "Non-invasive technique using wooden tools to sculpt the body, break down fat, and stimulate the lymphatic system.",
      price: 120,
      duration: 60,
      image: "images/Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png",
      featured: true
    });
    
    this.createTreatment({
      slug: "cavitation-vacuum",
      title: "Cavitation & Vacuum",
      description: "Powerful, non-invasive treatment using sound waves to break down stubborn fat cells and enhance circulation.",
      price: 150,
      duration: 75,
      image: "images/Screenshot 2025-05-04 154211.png",
      featured: true
    });
    
    this.createTreatment({
      slug: "lymphatic-drainage",
      title: "Lymphatic Drainage",
      description: "Gentle massage technique that stimulates the lymphatic system to reduce water retention and enhance circulation.",
      price: 135,
      duration: 60,
      image: "images/Screenshot 2025-05-04 160111.png",
      featured: true
    });
    
    this.createTreatment({
      slug: "recovery-boost",
      title: "RecoveryBoost",
      description: "Personalized post-op drainage massage designed specifically for post-operative recovery.",
      price: 160,
      duration: 90,
      image: "images/FDAFD339-7FA3-4285-9421-7B79CAA669BF.jpeg",
      featured: false
    });
    
    this.createTreatment({
      slug: "laser-lipo",
      title: "Laser Lipo",
      description: "Non-invasive treatment that uses advanced laser technology to break down stubborn fat cells.",
      price: 180,
      duration: 90,
      image: "images/Before After Beauty Skincare Minimlasit Instagram Post.png",
      featured: false
    });
    
    // Your actual products
    this.createProduct({
      slug: "waist-trainer-1",
      title: "Waist Trainer",
      description: "Premium quality waist trainer designed for body sculpting and support during workouts.",
      price: 25,
      image: "image_1747338239575.png",
      category: "Waist Trainers",
      featured: true,
      stockQuantity: 15
    });
    
    this.createProduct({
      slug: "waist-trainer-2",
      title: "Premium Waist Trainer",
      description: "Advanced waist trainer with enhanced compression and comfort for maximum body sculpting results.",
      price: 29.12,
      image: "image_1747337696802.png",
      category: "Waist Trainers",
      featured: true,
      stockQuantity: 12
    });
    
    // Sample testimonials
    this.createTestimonial({
      name: "Jessica M.",
      treatment: "Wood Therapy Client",
      rating: 5.0,
      content: "After just 4 sessions of wood therapy, the difference in my body is incredible. Not only do I look better, but I feel more confident and energized. The staff is professional, knowledgeable, and truly caring.",
      initials: "JM",
      featured: true
    });
    
    this.createTestimonial({
      name: "Robert K.",
      treatment: "RecoveryBoost Client",
      rating: 5.0,
      content: "The lymphatic drainage massage completely transformed my recovery after surgery. The therapist was incredibly attentive to my needs and made the experience comfortable. I'm so grateful for finding this place!",
      initials: "RK",
      featured: true
    });
    
    this.createTestimonial({
      name: "Tanya S.",
      treatment: "Cavitation Client",
      rating: 4.5,
      content: "I've tried many treatments for my stubborn belly fat, but nothing worked until I discovered Cavitation & Vacuum therapy at The Sculpting Art. The results are amazing, and the spa environment makes every visit a treat.",
      initials: "TS",
      featured: true
    });
    
    this.createTestimonial({
      name: "David L.",
      treatment: "Custom Treatment Plan",
      rating: 5.0,
      content: "The combination of treatments in my custom package has given me results I never thought possible. I've lost inches and gained confidence. The team is amazing at what they do and the environment is so calming.",
      initials: "DL",
      featured: true
    });
    
    // Sample gallery items
    this.createGalleryItem({
      title: "Abdominal Sculpting Results",
      category: "Before & After",
      image: "Before After Beauty Skincare Minimlasit Instagram Post.png",
      featured: true
    });
    
    this.createGalleryItem({
      title: "Facial Contouring Results",
      category: "Before & After",
      image: "Screenshot 2025-05-04 160111.png",
      featured: true
    });
    
    this.createGalleryItem({
      title: "Full Body Transformation",
      category: "Before & After",
      image: "Screenshot 2025-05-04 154211.png",
      featured: true
    });
    
    // Sample Instagram posts
    this.createInstagramPost({
      image: "Before After Beauty Skincare Minimlasit Instagram Post.png",
      likes: 156,
      url: "https://instagram.com/thesculptingartbyel"
    });
    
    this.createInstagramPost({
      image: "Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png",
      likes: 89,
      url: "https://instagram.com/thesculptingartbyel"
    });
    
    this.createInstagramPost({
      image: "Beige Nude Aesthetic Feminine Modern Gynecology Health Clinic Branding Logo.png",
      likes: 203,
      url: "https://instagram.com/thesculptingartbyel"
    });
    
    this.createInstagramPost({
      image: "Screenshot 2025-05-04 154211.png",
      likes: 134,
      url: "https://instagram.com/thesculptingartbyel"
    });
    
    this.createInstagramPost({
      image: "Before After Beauty Skincare Minimlasit Instagram Post.png",
      likes: 178,
      url: "https://instagram.com/thesculptingartbyel"
    });
    
    this.createInstagramPost({
      image: "Screenshot 2025-05-04 160111.png",
      likes: 112,
      url: "https://instagram.com/thesculptingartbyel"
    });
    
    // Create admin user
    this.createUser({
      username: "admin",
      password: "admin123", // In a real app, this would be hashed
      email: "admin@thesculptingart.com",
      fullName: "Admin User",
      role: "admin"
    });

    // Add sample product reviews for waist trainers
    this.createProductReview({
      productId: 1,
      customerName: "Sarah J.",
      rating: 5,
      reviewText: "Amazing quality waist trainer! Really helps with posture and gives great support during workouts. Highly recommend!",
      verified: true
    });

    this.createProductReview({
      productId: 1,
      customerName: "Emma R.",
      rating: 4,
      reviewText: "Good product, fits well and comfortable to wear. Noticed improvements in my silhouette after a few weeks.",
      verified: true
    });

    this.createProductReview({
      productId: 2,
      customerName: "Maria L.",
      rating: 5,
      reviewText: "Excellent waist trainer! The quality is outstanding and it's very comfortable. Perfect for my daily workouts.",
      verified: true
    });
  }

  async getProductReviews(productId: number): Promise<ProductReview[]> {
    return Array.from(this.productReviews.values()).filter(review => review.productId === productId);
  }

  async createProductReview(review: InsertProductReview): Promise<ProductReview> {
    const id = this.productReviewIdCounter++;
    const newReview: ProductReview = { 
      ...review, 
      id,
      createdAt: new Date()
    };
    this.productReviews.set(id, newReview);
    return newReview;
  }

  async getAverageRating(productId: number): Promise<number> {
    const reviews = await this.getProductReviews(productId);
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((totalRating / reviews.length) * 10) / 10; // Round to 1 decimal place
  }

  // Website Settings methods
  async getWebsiteSettings(): Promise<WebsiteSettings> {
    return this.websiteSettings;
  }

  async updateWebsiteSettings(settings: Partial<InsertWebsiteSettings>): Promise<WebsiteSettings> {
    this.websiteSettings = { ...this.websiteSettings, ...settings };
    return this.websiteSettings;
  }

  // Payment Session methods (in-memory implementation)
  private paymentSessions: Map<number, PaymentSession>;
  private paymentSessionIdCounter: number;

  async createPaymentSession(paymentSession: InsertPaymentSession): Promise<PaymentSession> {
    if (!this.paymentSessions) {
      this.paymentSessions = new Map();
      this.paymentSessionIdCounter = 1;
    }
    const id = this.paymentSessionIdCounter++;
    const newPaymentSession: PaymentSession = { 
      ...paymentSession, 
      id,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours from now
    };
    this.paymentSessions.set(id, newPaymentSession);
    return newPaymentSession;
  }

  async getPaymentSession(id: number): Promise<PaymentSession | undefined> {
    if (!this.paymentSessions) return undefined;
    return this.paymentSessions.get(id);
  }

  async getPaymentSessionByStripeId(stripeSessionId: string): Promise<PaymentSession | undefined> {
    if (!this.paymentSessions) return undefined;
    return Array.from(this.paymentSessions.values()).find(
      (session) => session.stripeSessionId === stripeSessionId
    );
  }

  async getPaymentSessionByOrderId(orderId: number): Promise<PaymentSession | undefined> {
    if (!this.paymentSessions) return undefined;
    return Array.from(this.paymentSessions.values()).find(
      (session) => session.orderId === orderId
    );
  }

  async getPaymentSessionByBookingId(bookingId: number): Promise<PaymentSession | undefined> {
    if (!this.paymentSessions) return undefined;
    return Array.from(this.paymentSessions.values()).find(
      (session) => session.bookingId === bookingId
    );
  }

  async updatePaymentSessionStatus(id: number, status: string): Promise<PaymentSession | undefined> {
    if (!this.paymentSessions) return undefined;
    const session = this.paymentSessions.get(id);
    if (!session) return undefined;
    
    const updatedSession = { ...session, status };
    this.paymentSessions.set(id, updatedSession);
    return updatedSession;
  }
}

import { DatabaseStorage } from "./database-storage";

// Export storage instance - switch to database storage
export const storage = process.env.DATABASE_URL ? new DatabaseStorage() : new MemStorage();
