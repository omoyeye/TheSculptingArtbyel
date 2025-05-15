import { 
  users, type User, type InsertUser,
  treatments, type Treatment, type InsertTreatment,
  products, type Product, type InsertProduct,
  bookings, type Booking, type InsertBooking,
  orders, type Order, type InsertOrder,
  orderItems, type OrderItem, type InsertOrderItem,
  testimonials, type Testimonial, type InsertTestimonial,
  galleryItems, type GalleryItem, type InsertGalleryItem,
  instagramPosts, type InstagramPost, type InsertInstagramPost
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
  
  private userIdCounter: number;
  private treatmentIdCounter: number;
  private productIdCounter: number;
  private bookingIdCounter: number;
  private orderIdCounter: number;
  private orderItemIdCounter: number;
  private testimonialIdCounter: number;
  private galleryItemIdCounter: number;
  private instagramPostIdCounter: number;
  
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
    
    this.userIdCounter = 1;
    this.treatmentIdCounter = 1;
    this.productIdCounter = 1;
    this.bookingIdCounter = 1;
    this.orderIdCounter = 1;
    this.orderItemIdCounter = 1;
    this.testimonialIdCounter = 1;
    this.galleryItemIdCounter = 1;
    this.instagramPostIdCounter = 1;
    
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
    
    // Sample products
    this.createProduct({
      slug: "sculpting-oil",
      title: "Sculpting Body Oil",
      description: "Firming & Toning formula that enhances the results of your treatments.",
      price: 42,
      image: "images/Soft Brown Massage Treatment Relaxing Your Body Instagram Story.png",
      category: "Body Oils",
      badge: "NEW",
      featured: true,
      stockQuantity: 25
    });
    
    this.createProduct({
      slug: "detox-scrub",
      title: "Detox Body Scrub",
      description: "Exfoliating & Smoothing scrub that removes dead skin cells and improves circulation.",
      price: 38,
      image: "images/Screenshot 2025-05-04 160111.png",
      category: "Scrubs",
      featured: true,
      stockQuantity: 30
    });
    
    this.createProduct({
      slug: "massage-kit",
      title: "Home Massage Kit",
      description: "Self-Care Essentials to maintain your results between professional treatments.",
      price: 75,
      image: "images/IMG_3361.jpeg",
      category: "Tools",
      badge: "BEST SELLER",
      featured: true,
      stockQuantity: 15
    });
    
    this.createProduct({
      slug: "firming-cream",
      title: "Firming Body Cream",
      description: "Hydrating & Tightening cream that improves skin elasticity and firmness.",
      price: 48,
      image: "images/DE40158A-B168-46C1-B082-94E9F91478C5.jpeg",
      category: "Body Creams",
      featured: true,
      stockQuantity: 20
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
  }
}

// Export storage instance
export const storage = new MemStorage();
