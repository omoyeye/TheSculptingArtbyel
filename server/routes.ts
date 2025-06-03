import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { pool } from "./db";
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

const insertPaymentSessionSchema = z.object({
  orderId: z.number().optional(),
  bookingId: z.number().optional(),
  stripeSessionId: z.string(),
  stripePaymentUrl: z.string(),
  status: z.string().default("pending"),
  amount: z.number(),
  expiresAt: z.string().transform((val) => new Date(val)),
});

const insertContactSubmissionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  subject: z.string().min(1),
  message: z.string().min(10),
});

const insertNewsletterSubscriptionSchema = z.object({
  email: z.string().email(),
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
      // Check if booking is enabled
      const settings = await storage.getWebsiteSettings();
      if (!settings.bookingEnabled) {
        return res.status(503).json({ 
          message: "Booking system is currently disabled. Please contact us directly to schedule your appointment." 
        });
      }

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
  
  // Create order with instant download data
  app.post("/api/create-order-download", async (req, res) => {
    try {
      const { customerInfo, total, items } = req.body;
      
      // Generate order number
      const orderNumber = `TSA-${Date.now()}`;
      
      // Create order in database
      const order = await storage.createOrder({
        total: total.toString(),
        status: "pending",
        userId: null
      });

      // Create order items and handle both products and bookings
      const createdItems = [];
      for (const item of items) {
        // Convert string productId to integer for database compatibility
        let productId = null;
        if (item.productId && typeof item.productId === 'string') {
          // Extract numeric ID from string IDs like "product-waist-trainer-2-1748893458688"
          const match = item.productId.match(/(\d+)$/);
          if (match) {
            productId = parseInt(match[1]);
          }
        } else if (typeof item.productId === 'number') {
          productId = item.productId;
        }

        const orderItem = await storage.createOrderItem({
          orderId: order.id,
          productId: productId,
          quantity: item.quantity,
          price: item.price.toString()
        });
        createdItems.push({
          ...orderItem,
          title: item.title,
          type: item.type,
          date: item.date,
          time: item.time
        });
      }

      // Create bookings for treatment items
      for (const item of items) {
        if (item.type === 'booking' && item.treatmentId && item.date && item.time) {
          // Extract numeric treatment ID from string (e.g., "booking-wood-therapy-30-12345" -> find treatment by slug)
          let actualTreatmentId;
          
          if (typeof item.treatmentId === 'string' && item.treatmentId.startsWith('booking-')) {
            // Parse the slug from the booking ID and find the treatment
            const parts = item.treatmentId.split('-');
            if (parts.length >= 4) {
              const slug = parts.slice(1, -1).join('-'); // Extract slug (e.g., "wood-therapy-30")
              const treatment = await storage.getTreatmentBySlug(slug);
              actualTreatmentId = treatment?.id;
            }
          } else {
            actualTreatmentId = typeof item.treatmentId === 'number' ? item.treatmentId : parseInt(item.treatmentId);
          }
          
          if (actualTreatmentId) {
            await storage.createBooking({
              treatmentId: actualTreatmentId,
              date: item.date,
              time: item.time,
              price: item.price.toString(),
              status: "confirmed",
              userId: null
            });
          }
        }
      }

      // Prepare download data
      const downloadData = {
        orderNumber,
        date: new Date().toISOString(),
        status: "pending",
        customerInfo,
        items: createdItems,
        total,
        businessInfo: {
          name: "The Sculpting Art",
          email: "info@thesculptingartbyel.com", 
          phone: "+44 7570 618832"
        }
      };

      console.log("Order created successfully:", {
        orderId: order.id,
        orderNumber,
        itemCount: createdItems.length,
        total
      });

      res.json({ order, downloadData });
      
    } catch (error) {
      console.error("Error creating order:", error);
      res.status(500).json({ 
        message: "Failed to create order", 
        error: error instanceof Error ? error.message : String(error) 
      });
    }
  });

  // API route to get payment URL for products/bookings
  app.get("/api/payment-url/:type/:id", async (req, res) => {
    try {
      // Return the Stripe checkout URL
      const paymentUrl = "https://buy.stripe.com/fZufZidtE52l9PseC0a7C00";
      res.json({ url: paymentUrl });
    } catch (error) {
      console.error("Error fetching payment URL:", error);
      res.status(500).json({ message: "Failed to fetch payment URL" });
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
  app.get("/api/orders", async (req, res) => {
    try {
      const orders = await storage.getOrders();
      
      // Get order items for each order
      const ordersWithItems = await Promise.all(orders.map(async (order) => {
        const items = await storage.getOrderItems(order.id);
        return { ...order, items };
      }));
      
      res.json(ordersWithItems);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get("/api/bookings", async (req, res) => {
    try {
      const bookings = await storage.getBookings();
      res.json(bookings);
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  // Contact form submission endpoint
  app.post("/api/contact", validateBody(insertContactSubmissionSchema), async (req, res) => {
    try {
      const contactData = req.body;
      const submission = await storage.createContactSubmission(contactData);
      res.status(201).json({ message: "Contact form submitted successfully", submission });
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Newsletter subscription endpoint
  app.post("/api/newsletter", validateBody(insertNewsletterSubscriptionSchema), async (req, res) => {
    try {
      const { email } = req.body;
      
      // Check if email already exists
      const existing = await storage.getNewsletterSubscriptionByEmail(email);
      if (existing) {
        if (existing.status === 'active') {
          return res.status(400).json({ message: "Email already subscribed" });
        } else {
          // Reactivate subscription
          await storage.updateNewsletterSubscriptionStatus(email, 'active');
          return res.json({ message: "Subscription reactivated successfully" });
        }
      }
      
      const subscription = await storage.createNewsletterSubscription({ email });
      res.status(201).json({ message: "Subscribed successfully", subscription });
    } catch (error) {
      console.error('Failed to subscribe to newsletter:', error);
      res.status(500).json({ message: "Failed to subscribe to newsletter" });
    }
  });

  // Admin endpoints for contact submissions and newsletter subscriptions
  app.get("/api/contact-submissions", async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error('Failed to fetch contact submissions:', error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  app.get("/api/newsletter-subscriptions", async (req, res) => {
    try {
      const subscriptions = await storage.getNewsletterSubscriptions();
      res.json(subscriptions);
    } catch (error) {
      console.error('Failed to fetch newsletter subscriptions:', error);
      res.status(500).json({ message: "Failed to fetch newsletter subscriptions" });
    }
  });
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

  // Payment session routes
  app.post("/api/payment-sessions", validateBody(insertPaymentSessionSchema), async (req, res) => {
    try {
      const paymentSession = await storage.createPaymentSession(req.body);
      res.status(201).json(paymentSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to create payment session" });
    }
  });

  app.get("/api/payment-sessions/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const paymentSession = await storage.getPaymentSession(id);
      if (!paymentSession) {
        return res.status(404).json({ message: "Payment session not found" });
      }
      res.json(paymentSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payment session" });
    }
  });

  app.get("/api/payment-sessions/stripe/:stripeSessionId", async (req, res) => {
    try {
      const stripeSessionId = req.params.stripeSessionId;
      const paymentSession = await storage.getPaymentSessionByStripeId(stripeSessionId);
      if (!paymentSession) {
        return res.status(404).json({ message: "Payment session not found" });
      }
      res.json(paymentSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payment session" });
    }
  });

  app.get("/api/orders/:orderId/payment-session", async (req, res) => {
    try {
      const orderId = parseInt(req.params.orderId);
      const paymentSession = await storage.getPaymentSessionByOrderId(orderId);
      if (!paymentSession) {
        return res.status(404).json({ message: "Payment session not found for this order" });
      }
      res.json(paymentSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payment session for order" });
    }
  });

  app.get("/api/bookings/:bookingId/payment-session", async (req, res) => {
    try {
      const bookingId = parseInt(req.params.bookingId);
      const paymentSession = await storage.getPaymentSessionByBookingId(bookingId);
      if (!paymentSession) {
        return res.status(404).json({ message: "Payment session not found for this booking" });
      }
      res.json(paymentSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch payment session for booking" });
    }
  });

  app.put("/api/payment-sessions/:id/status", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;
      
      if (!status || typeof status !== 'string') {
        return res.status(400).json({ message: "Status is required" });
      }
      
      const paymentSession = await storage.updatePaymentSessionStatus(id, status);
      if (!paymentSession) {
        return res.status(404).json({ message: "Payment session not found" });
      }
      res.json(paymentSession);
    } catch (error) {
      res.status(500).json({ message: "Failed to update payment session status" });
    }
  });
  
  // Create HTTP server
  const httpServer = createServer(app);
  
  return httpServer;
}
