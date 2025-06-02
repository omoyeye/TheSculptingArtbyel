import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import TreatmentCard from "./TreatmentCard";
import { useQuery } from "@tanstack/react-query";

export default function FeaturedTreatments() {
  const { data: treatments = [] } = useQuery({
    queryKey: ['/api/treatments']
  });

  return (
    <section id="treatments" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair text-secondary mb-4">
            Our Signature Treatments
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Discover our specialized body sculpting therapies designed to help you 
            achieve your body goals with non-invasive, effective techniques.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(treatments) && treatments.filter((t: any) => t.featured).slice(0, 3).map((treatment: any) => (
            <TreatmentCard key={treatment.id} treatment={treatment} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button 
            asChild 
            variant="outline" 
            className="border-secondary text-secondary hover:bg-secondary hover:text-white"
          >
            <Link href="/treatments">View All Treatments</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
