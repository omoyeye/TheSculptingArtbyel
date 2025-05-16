import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";
import { getImage } from "@/assets/imageImports";

interface BeforeAfterItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

const beforeAfterItems: BeforeAfterItem[] = [
  {
    id: "1",
    title: "Abdominal Sculpting",
    description: "Wood Therapy + Cavitation (4 sessions)",
    image: "Before After Beauty Skincare Minimlasit Instagram Post.png",
  },
  {
    id: "2",
    title: "Facial Contouring",
    description: "Lymphatic Drainage (3 sessions)",
    image: "DE40158A-B168-46C1-B082-94E9F91478C5.jpeg",
  },
  {
    id: "3",
    title: "Full Body Transformation",
    description: "Custom Treatment Plan (8 sessions)",
    image: "FDAFD339-7FA3-4285-9421-7B79CAA669BF.jpeg",
  },
];

export default function BeforeAfterResults() {
  // Use the centralized image getter function
  const getImagePath = useCallback((filename: string) => {
    return getImage(filename);
  }, []);

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair text-secondary mb-4">
            Real Results
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            See the transformative power of our treatments with these before and after 
            images from our satisfied clients.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beforeAfterItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl overflow-hidden shadow-lg">
              <img 
                src={getImagePath(item.image)} 
                alt={`${item.title} Before and After`} 
                className="w-full h-80 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-playfair text-secondary mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-500 mb-3">{item.description}</p>
                <Link 
                  href="/gallery" 
                  className="text-primary hover:text-primary/80 text-sm font-medium"
                >
                  See more results
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button
            asChild
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-white"
          >
            <Link href="/gallery">View Gallery</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
