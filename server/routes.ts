import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";

// Simple validation schemas for the in-memory storage
const insertUserSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string().email(),
  fullName: z.string(),
  role: z.string().default("customer"),
});

const insertTreatmentSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  duration: z.number(),
  image: z.string(),
  featured: z.boolean().optional(),
});

const insertProductSchema = z.object({
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.string(),
  badge: z.string().optional(),
  featured: z.boolean().optional(),
  stockQuantity: z.number().default(0),
});

const insertBookingSchema = z.object({
  userId: z.number().optional(),
  treatmentId: z.number(),
  date: z.string(),
  time: z.string(),
  status: z.string().default("pending"),
  price: z.number(),
});

const insertOrderSchema = z.object({
  userId: z.number().optional(),
  status: z.string().default("pending"),
  total: z.number(),
});

const insertOrderItemSchema = z.object({
  orderId: z.number(),
  productId: z.number(),
  quantity: z.number(),
  price: z.number(),
});

const insertTestimonialSchema = z.object({
  name: z.string(),
  treatment: z.string(),
  rating: z.number(),
  content: z.string(),
  initials: z.string(),
  featured: z.boolean().optional(),
});

const insertGalleryItemSchema = z.object({
  title: z.string(),
  category: z.string(),
  image: z.string(),
  featured: z.boolean().optional(),
});

const insertInstagramPostSchema = z.object({
  image: z.string(),
  likes: z.number().default(0),
  url: z.string().optional(),
});

const insertProductReviewSchema = z.object({
  productId: z.number(),
  customerName: z.string(),
  rating: z.number().min(1).max(5),
  reviewText: z.string(),
  verified: z.boolean().default(false),
});

// Helper function to validate request body with zod schema
function validateBody<T>(schema: z.ZodType<T>) {
  return (req: Request, res: Response, next: () => void) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ 
          message: "Validation error", 
          errors: error.errors 
        });
      } else {
        res.status(500).json({ message: "Server error" });
      }
    }
  };
}

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for treatments
  app.get("/api/treatments", async (req, res) => {
    try {
      const treatments = await storage.getTreatments();
      res.json(treatments);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch treatments" });
    }
  });
  
  app.get("/api/treatments/:slug", async (req, res) => {
    try {
      const treatment = await storage.getTreatmentBySlug(req.params.slug);
      if (!treatment) {
        return res.status(404).json({ message: "Treatment not found" });
      }
      res.json(treatment);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch treatment" });
    }
  });
  
  app.post("/api/treatments", validateBody(insertTreatmentSchema), async (req, res) => {
    try {
      const treatment = await storage.createTreatment(req.body);
      res.status(201).json(treatment);
    } catch (error) {
      res.status(500).json({ message: "Failed to create treatment" });
    }
  });
  
  app.put("/api/treatments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const treatment = await storage.updateTreatment(id, req.body);
      if (!treatment) {
        return res.status(404).json({ message: "Treatment not found" });
      }
      res.json(treatment);
    } catch (error) {
      res.status(500).json({ message: "Failed to update treatment" });
    }
  });
  
  app.delete("/api/treatments/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteTreatment(id);
      if (!success) {
        return res.status(404).json({ message: "Treatment not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete treatment" });
    }
  });
  
  // API routes for products
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });
  
  app.get("/api/products/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });
  
  app.post("/api/products", validateBody(insertProductSchema), async (req, res) => {
    try {
      const product = await storage.createProduct(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to create product" });
    }
  });
  
  app.put("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.updateProduct(id, req.body);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to update product" });
    }
  });
  
  app.delete("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteProduct(id);
      if (!success) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product" });
    }
  });
  
  // API routes for bookings
  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });
  
  app.get("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const booking = await storage.getBooking(id);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch booking" });
    }
  });
  
  app.post("/api/bookings", validateBody(insertBookingSchema), async (req, res) => {
    try {
      const booking = await storage.createBooking(req.body);
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to create booking" });
    }
  });
  
  app.put("/api/bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const booking = await storage.updateBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });
  
  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBooking(id);
      if (!success) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete booking" });
    }
  });
  
  // API routes for orders
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });
  
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      
      // Get order items
      const orderItems = await storage.getOrderItems(id);
      
      res.json({ ...order, items: orderItems });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });
  
  app.post("/api/orders", validateBody(insertOrderSchema), async (req, res) => {
    try {
      const { items, ...orderData } = req.body;
      
      // Create order
      const order = await storage.createOrder(orderData);
      
      // Create order items
      if (items && Array.isArray(items)) {
        for (const item of items) {
          await storage.createOrderItem({
            ...item,
            orderId: order.id
          });
        }
      }
      
      res.status(201).json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to create order" });
    }
  });
  
  app.put("/api/orders/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const order = await storage.updateOrderStatus(id, status);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to update order status" });
    }
  });
  
  // API routes for testimonials
  app.get("/api/testimonials", async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });
  
  app.post("/api/testimonials", validateBody(insertTestimonialSchema), async (req, res) => {
    try {
      const testimonial = await storage.createTestimonial(req.body);
      res.status(201).json(testimonial);
    } catch (error) {
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });
  
  // API routes for gallery
  app.get("/api/gallery", async (req, res) => {
    try {
      const category = req.query.category as string;
      
      if (category) {
        const items = await storage.getGalleryItemsByCategory(category);
        return res.json(items);
      }
      
      const items = await storage.getGalleryItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch gallery items" });
    }
  });
  
  app.post("/api/gallery", validateBody(insertGalleryItemSchema), async (req, res) => {
    try {
      const galleryItem = await storage.createGalleryItem(req.body);
      res.status(201).json(galleryItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to create gallery item" });
    }
  });
  
  // API routes for Instagram posts
  app.get("/api/instagram", async (req, res) => {
    try {
      const posts = await storage.getInstagramPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch Instagram posts" });
    }
  });
  
  app.post("/api/instagram", validateBody(insertInstagramPostSchema), async (req, res) => {
    try {
      const post = await storage.createInstagramPost(req.body);
      res.status(201).json(post);
    } catch (error) {
      res.status(500).json({ message: "Failed to create Instagram post" });
    }
  });

  // Product Reviews routes
  app.get("/api/products/:id/reviews", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const reviews = await storage.getProductReviews(productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product reviews" });
    }
  });

  app.post("/api/products/:id/reviews", validateBody(insertProductReviewSchema), async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const reviewData = { ...req.body, productId };
      const review = await storage.createProductReview(reviewData);
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to create product review" });
    }
  });

  app.get("/api/products/:id/rating", async (req, res) => {
    try {
      const productId = parseInt(req.params.id);
      const averageRating = await storage.getAverageRating(productId);
      res.json({ averageRating });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product rating" });
    }
  });
  
  // API routes for authentication
  app.post("/api/register", validateBody(insertUserSchema), async (req, res) => {
    try {
      // Check if username or email already exists
      const existingUserByUsername = await storage.getUserByUsername(req.body.username);
      if (existingUserByUsername) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const existingUserByEmail = await storage.getUserByEmail(req.body.email);
      if (existingUserByEmail) {
        return res.status(400).json({ message: "Email already exists" });
      }
      
      // Create user
      const user = await storage.createUser(req.body);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to register user" });
    }
  });
  
  app.post("/api/login", async (req, res) => {
    try {
      const { username, password } = req.body;
      
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }
      
      const user = await storage.getUserByUsername(username);
      if (!user || user.password !== password) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      
      // In a real app, we would use JWT or sessions for authentication
      // For simplicity, we'll just return the user without the password
      const { password: _, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Failed to login" });
    }
  });

  // API routes for website settings (Admin functionality)
  app.get("/api/settings", async (req, res) => {
    try {
      const settings = await storage.getWebsiteSettings();
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch website settings" });
    }
  });

  app.put("/api/settings", async (req, res) => {
    try {
      const settings = await storage.updateWebsiteSettings(req.body);
      res.json(settings);
    } catch (error) {
      res.status(500).json({ message: "Failed to update website settings" });
    }
  });

  // Admin-specific routes for managing bookings and orders
  app.put("/api/bookings/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      const booking = await storage.updateBookingStatus(id, status);
      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Failed to update booking status" });
    }
  });

  app.delete("/api/bookings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteBooking(id);
      if (!success) {
        return res.status(404).json({ message: "Booking not found" });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Failed to delete booking" });
    }
  });
  
  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
