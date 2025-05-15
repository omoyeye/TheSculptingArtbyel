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
import { db } from "./db";
import { eq, and } from "drizzle-orm";

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
  updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined>;
  deleteTestimonial(id: number): Promise<boolean>;
  
  // Gallery Items
  getGalleryItems(): Promise<GalleryItem[]>;
  getGalleryItemsByCategory(category: string): Promise<GalleryItem[]>;
  createGalleryItem(galleryItem: InsertGalleryItem): Promise<GalleryItem>;
  updateGalleryItem(id: number, galleryItem: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined>;
  deleteGalleryItem(id: number): Promise<boolean>;
  
  // Instagram Posts
  getInstagramPosts(): Promise<InstagramPost[]>;
  createInstagramPost(instagramPost: InsertInstagramPost): Promise<InstagramPost>;
  updateInstagramPost(id: number, instagramPost: Partial<InsertInstagramPost>): Promise<InstagramPost | undefined>;
  deleteInstagramPost(id: number): Promise<boolean>;
}

// Database storage implementation
export class DatabaseStorage implements IStorage {
  // Users
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
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }
  
  // Treatments
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
    const [newTreatment] = await db.insert(treatments).values(treatment).returning();
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
    const [deletedTreatment] = await db
      .delete(treatments)
      .where(eq(treatments.id, id))
      .returning();
    return !!deletedTreatment;
  }
  
  // Products
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
    const [newProduct] = await db.insert(products).values(product).returning();
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
    const [deletedProduct] = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();
    return !!deletedProduct;
  }
  
  // Bookings
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
    const [newBooking] = await db.insert(bookings).values(booking).returning();
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
    const [deletedBooking] = await db
      .delete(bookings)
      .where(eq(bookings.id, id))
      .returning();
    return !!deletedBooking;
  }
  
  // Orders
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
    const [newOrder] = await db.insert(orders).values(order).returning();
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
  
  // Order Items
  async getOrderItems(orderId: number): Promise<OrderItem[]> {
    return await db.select().from(orderItems).where(eq(orderItems.orderId, orderId));
  }
  
  async createOrderItem(orderItem: InsertOrderItem): Promise<OrderItem> {
    const [newOrderItem] = await db.insert(orderItems).values(orderItem).returning();
    return newOrderItem;
  }
  
  // Testimonials
  async getTestimonials(): Promise<Testimonial[]> {
    return await db.select().from(testimonials);
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db.insert(testimonials).values(testimonial).returning();
    return newTestimonial;
  }
  
  async updateTestimonial(id: number, testimonial: Partial<InsertTestimonial>): Promise<Testimonial | undefined> {
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set(testimonial)
      .where(eq(testimonials.id, id))
      .returning();
    return updatedTestimonial || undefined;
  }
  
  async deleteTestimonial(id: number): Promise<boolean> {
    const [deletedTestimonial] = await db
      .delete(testimonials)
      .where(eq(testimonials.id, id))
      .returning();
    return !!deletedTestimonial;
  }
  
  // Gallery Items
  async getGalleryItems(): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems);
  }
  
  async getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
    return await db.select().from(galleryItems).where(eq(galleryItems.category, category));
  }
  
  async createGalleryItem(galleryItem: InsertGalleryItem): Promise<GalleryItem> {
    const [newGalleryItem] = await db.insert(galleryItems).values(galleryItem).returning();
    return newGalleryItem;
  }
  
  async updateGalleryItem(id: number, galleryItem: Partial<InsertGalleryItem>): Promise<GalleryItem | undefined> {
    const [updatedGalleryItem] = await db
      .update(galleryItems)
      .set(galleryItem)
      .where(eq(galleryItems.id, id))
      .returning();
    return updatedGalleryItem || undefined;
  }
  
  async deleteGalleryItem(id: number): Promise<boolean> {
    const [deletedGalleryItem] = await db
      .delete(galleryItems)
      .where(eq(galleryItems.id, id))
      .returning();
    return !!deletedGalleryItem;
  }
  
  // Instagram Posts
  async getInstagramPosts(): Promise<InstagramPost[]> {
    return await db.select().from(instagramPosts);
  }
  
  async createInstagramPost(instagramPost: InsertInstagramPost): Promise<InstagramPost> {
    const [newInstagramPost] = await db.insert(instagramPosts).values(instagramPost).returning();
    return newInstagramPost;
  }
  
  async updateInstagramPost(id: number, instagramPost: Partial<InsertInstagramPost>): Promise<InstagramPost | undefined> {
    const [updatedInstagramPost] = await db
      .update(instagramPosts)
      .set(instagramPost)
      .where(eq(instagramPosts.id, id))
      .returning();
    return updatedInstagramPost || undefined;
  }
  
  async deleteInstagramPost(id: number): Promise<boolean> {
    const [deletedInstagramPost] = await db
      .delete(instagramPosts)
      .where(eq(instagramPosts.id, id))
      .returning();
    return !!deletedInstagramPost;
  }
}

// Use DatabaseStorage instead of MemStorage
export const storage = new DatabaseStorage();