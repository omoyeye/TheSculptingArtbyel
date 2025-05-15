import { useState, useRef, useEffect } from "react";
import { Star, StarHalf } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Testimonials() {
  const { testimonials } = useStore();
  const [scrollPosition, setScrollPosition] = useState(0);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  // Handle scrolling
  useEffect(() => {
    const container = testimonialsRef.current;
    if (!container) return;

    const handleScroll = () => {
      setScrollPosition(container.scrollLeft);
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  const renderRating = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    return (
      <div className="flex items-center text-accent">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`star-${i}`} className="fill-current" />
        ))}
        {hasHalfStar && <StarHalf className="fill-current" />}
      </div>
    );
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair text-secondary mb-4">
            Client Experiences
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Hear what our clients have to say about their transformative journeys with The Sculpting Art.
          </p>
        </div>
        
        <div 
          ref={testimonialsRef}
          className="flex overflow-x-auto pb-8 -mx-4 px-4 space-x-6 no-scrollbar snap-x snap-mandatory"
        >
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id} 
              className="min-w-[300px] md:min-w-[350px] bg-white rounded-xl p-6 shadow-lg flex flex-col snap-start"
            >
              <div className="flex items-center mb-4">
                {renderRating(testimonial.rating)}
              </div>
              <blockquote className="text-gray-600 italic mb-6 flex-grow">
                "{testimonial.content}"
              </blockquote>
              <div className="flex items-center mt-auto">
                <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center text-secondary font-medium mr-3">
                  {testimonial.initials}
                </div>
                <div>
                  <p className="font-medium">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.treatment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Scroll indicator dots */}
        {testimonials.length > 3 && (
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, i) => {
              // Simple check to highlight the dot based on scroll position
              const isActive = i === Math.floor(scrollPosition / 350);
              
              return (
                <button
                  key={`indicator-${i}`}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    isActive ? "bg-secondary scale-125" : "bg-gray-300"
                  }`}
                  onClick={() => {
                    testimonialsRef.current?.scrollTo({
                      left: i * 350,
                      behavior: "smooth",
                    });
                  }}
                  aria-label={`Scroll to testimonial ${i + 1}`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
