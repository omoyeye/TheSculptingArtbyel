
-- Initial migration for The Sculpting Art database

-- Users table
CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"email" text NOT NULL,
	"full_name" text NOT NULL,
	"role" text DEFAULT 'customer' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);

-- Treatments table
CREATE TABLE IF NOT EXISTS "treatments" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"price" numeric(10,2) NOT NULL,
	"duration" integer NOT NULL,
	"image" text NOT NULL,
	"featured" boolean DEFAULT false,
	CONSTRAINT "treatments_slug_unique" UNIQUE("slug")
);

-- Products table
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"price" numeric(10,2) NOT NULL,
	"image" text NOT NULL,
	"category" text NOT NULL,
	"badge" text,
	"featured" boolean DEFAULT false,
	"stock_quantity" integer DEFAULT 0,
	CONSTRAINT "products_slug_unique" UNIQUE("slug")
);

-- Bookings table
CREATE TABLE IF NOT EXISTS "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"treatment_id" integer NOT NULL,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"price" numeric(10,2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Orders table
CREATE TABLE IF NOT EXISTS "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"status" text DEFAULT 'pending' NOT NULL,
	"total" numeric(10,2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Order items table
CREATE TABLE IF NOT EXISTS "order_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer NOT NULL,
	"product_id" integer NOT NULL,
	"quantity" integer NOT NULL,
	"price" numeric(10,2) NOT NULL
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS "testimonials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"treatment" text NOT NULL,
	"rating" numeric(3,1) NOT NULL,
	"content" text NOT NULL,
	"initials" text NOT NULL,
	"featured" boolean DEFAULT false
);

-- Gallery items table
CREATE TABLE IF NOT EXISTS "gallery_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"category" text NOT NULL,
	"image" text NOT NULL,
	"featured" boolean DEFAULT false
);

-- Instagram posts table
CREATE TABLE IF NOT EXISTS "instagram_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"image" text NOT NULL,
	"likes" integer DEFAULT 0,
	"url" text
);

-- Product reviews table
CREATE TABLE IF NOT EXISTS "product_reviews" (
	"id" serial PRIMARY KEY NOT NULL,
	"product_id" integer NOT NULL,
	"customer_name" text NOT NULL,
	"rating" integer NOT NULL,
	"review_text" text NOT NULL,
	"verified" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);

-- Website settings table
CREATE TABLE IF NOT EXISTS "website_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"booking_enabled" boolean DEFAULT true,
	"maintenance_mode" boolean DEFAULT false,
	"business_hours" jsonb NOT NULL,
	"contact_info" jsonb NOT NULL,
	"social_media" jsonb NOT NULL,
	"site_content" jsonb NOT NULL
);

-- Payment sessions table
CREATE TABLE IF NOT EXISTS "payment_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" integer,
	"booking_id" integer,
	"stripe_session_id" text NOT NULL,
	"stripe_payment_url" text NOT NULL,
	"status" text DEFAULT 'pending' NOT NULL,
	"amount" numeric(10,2) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"expires_at" timestamp NOT NULL
);

-- Add foreign key constraints
DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "bookings" ADD CONSTRAINT "bookings_treatment_id_treatments_id_fk" FOREIGN KEY ("treatment_id") REFERENCES "treatments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "product_reviews" ADD CONSTRAINT "product_reviews_product_id_products_id_fk" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payment_sessions" ADD CONSTRAINT "payment_sessions_order_id_orders_id_fk" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
 ALTER TABLE "payment_sessions" ADD CONSTRAINT "payment_sessions_booking_id_bookings_id_fk" FOREIGN KEY ("booking_id") REFERENCES "bookings"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
