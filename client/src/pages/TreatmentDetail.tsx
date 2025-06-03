import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useParams, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { Clock, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Newsletter from "@/components/Newsletter";
import { getImage } from "@/assets/imageImports";

export default function TreatmentDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { treatments, addToCart } = useStore();
  const { toast } = useToast();
  const [treatment, setTreatment] = useState(treatments.find(t => t.id === params.id));

  const getImagePath = useCallback((filename: string) => {
    try {
      // Try to get image from our centralized imports first
      return getImage(filename);
    } catch (error) {
      console.error("Error loading image:", error);
      return "";
    }
  }, []);

  useEffect(() => {
    // Find the treatment with the matching ID
    const foundTreatment = treatments.find(t => t.id === params.id);
    
    if (!foundTreatment) {
      // If treatment not found, redirect to treatments page
      setLocation("/treatments");
      return;
    }
    
    setTreatment(foundTreatment);
  }, [params.id, treatments, setLocation]);

  const handleBookNow = () => {
    if (!treatment) return;
    
    // Redirect to booking page with treatment pre-selected
    setLocation(`/booking?treatment=${treatment.id}`);
  };

  const handleAddToCart = () => {
    if (!treatment) return;
    
    addToCart({
      type: 'booking',
      itemId: treatment.id,
      title: treatment.title,
      price: treatment.price,
      quantity: 1,
      image: treatment.image
    });
    
    toast({
      title: "Added to cart",
      description: `${treatment.title} has been added to your cart. You'll need to select a date and time before checkout.`
    });
  };

  if (!treatment) return null;

  return (
    <>
      <Helmet>
        <title>{treatment.title} | The Sculpting Art</title>
        <meta name="description" content={treatment.description} />
      </Helmet>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-4xl md:text-5xl font-playfair text-secondary">{treatment.title}</h1>
            <p className="text-lg text-gray-600">
              Transform your body with our professional, non-invasive treatment
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <div className="rounded-xl overflow-hidden shadow-lg">
                <img 
                  src={getImagePath(treatment.image)} 
                  alt={treatment.title}
                  className="w-full h-auto object-cover" 
                />
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-6">
                <Clock className="h-5 w-5 text-secondary mr-2" />
                <span className="font-medium">{treatment.duration} minutes</span>
              </div>
              
              <h2 className="text-3xl font-playfair text-secondary mb-4">
                {formatCurrency(treatment.price)}
              </h2>
              
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-700">
                  {treatment.description}
                </p>
                
                <h3 className="text-xl font-playfair text-secondary mt-8 mb-4">
                  Benefits
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span>Non-invasive body sculpting technique</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span>Reduces stubborn fat and cellulite</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span>Improves circulation and lymphatic drainage</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span>Contours the body for a more defined silhouette</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 mr-2 flex-shrink-0" />
                    <span>Enhances the results of your fitness routine</span>
                  </li>
                </ul>
              </div>
              
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-white"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
