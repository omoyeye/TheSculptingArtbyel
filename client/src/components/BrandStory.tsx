import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

export default function BrandStory() {
  const getImagePath = useCallback((filename: string) => {
    try {
      const path = new URL(`@assets/Beige Nude Aesthetic Feminine Modern Gynecology Health Clinic Branding Logo.png`, import.meta.url).href;
      return path;
    } catch (error) {
      console.error("Error loading image:", error);
      return "";
    }
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-playfair text-secondary mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-4">
              At The Sculpting Art, we believe that true beauty emerges when wellness and 
              confidence align. Founded with the vision of providing revolutionary body 
              sculpting techniques in a luxurious, nurturing environment, our spa has become 
              a sanctuary for those seeking to enhance their natural beauty.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Our team of specialized therapists combines traditional knowledge with 
              cutting-edge technology to deliver personalized treatments that address your 
              unique body goals. We're committed to helping you achieve results that not only 
              transform your appearance but also elevate your overall well-being.
            </p>
            <Button 
              asChild 
              variant="outline" 
              className="border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              <Link href="/about">Learn More About Us</Link>
            </Button>
          </div>
          
          <div className="order-1 lg:order-2">
            <img 
              src={getImagePath()} 
              alt="The Sculpting Art Spa" 
              className="rounded-xl shadow-lg w-full max-h-[600px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
