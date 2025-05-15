import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { 
  beforeAfterImage, 
  img3361, 
  img3362 
} from "@/assets/imageImports";

interface Slide {
  id: number;
  heading: string;
  subheading: string;
  backgroundImage: string;
}

const slides: Slide[] = [
  {
    id: 1,
    heading: "Redefine Your Body's Natural Beauty",
    subheading: "Experience transformative body sculpting and wellness treatments tailored to your unique needs.",
    backgroundImage: beforeAfterImage,
  },
  {
    id: 2,
    heading: "Sculpt, Define, Transform",
    subheading: "Advanced non-invasive techniques to help you achieve your body goals.",
    backgroundImage: img3361,
  },
  {
    id: 3,
    heading: "Wellness from the Inside Out",
    subheading: "Holistic approach to body sculpting that benefits both body and mind.",
    backgroundImage: img3362,
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  const goToPrevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  }, [isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentSlide) return;
    
    setIsTransitioning(true);
    setCurrentSlide(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 500);
  };

  // Auto slideshow
  useEffect(() => {
    const interval = setInterval(() => {
      goToNextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [goToNextSlide]);

  return (
    <section className="relative h-screen-90 overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-500",
            index === currentSlide ? "opacity-100" : "opacity-0 pointer-events-none"
          )}
        >
          <div className="absolute inset-0">
            <img 
              src={slide.backgroundImage} 
              alt={slide.heading}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          </div>
          
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white leading-tight mb-6">
                {slide.heading}
              </h1>
              <p className="text-xl md:text-2xl text-white mb-8 font-cormorant">
                {slide.subheading}
              </p>
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
                  <Link href="/booking">Book Your Treatment</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-secondary">
                  <Link href="/treatments">Explore Services</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      {/* Navigation Arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all duration-300 z-20"
        onClick={goToPrevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-30 text-white p-2 rounded-full hover:bg-opacity-50 transition-all duration-300 z-20"
        onClick={goToNextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-2 z-20">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            className={cn(
              "h-3 w-3 rounded-full transition-all duration-300",
              index === currentSlide
                ? "bg-white opacity-100 scale-110"
                : "bg-white opacity-50 hover:opacity-75"
            )}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
}
