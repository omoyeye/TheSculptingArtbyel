import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { Treatment } from "@/lib/store";
import { formatCurrency } from "@/lib/utils";
import { useCallback } from "react";
import { getImage } from "@/assets/imageImports";

interface TreatmentCardProps {
  treatment: Treatment;
}

export default function TreatmentCard({ treatment }: TreatmentCardProps) {
  const { id, title, description, price, image } = treatment;

  // Use the centralized image getter function
  const getImagePath = useCallback((filename: string) => {
    return getImage(filename);
  }, []);

  return (
    <div className="treatment-card bg-muted rounded-xl overflow-hidden shadow-lg transition duration-300">
      <img 
        className="w-full h-64 object-cover mt-[0px] mb-[0px] ml-[0px] mr-[0px] pl-[58px] pr-[58px]" 
        src={getImagePath(image)} 
        alt={`${title} Treatment`} 
        onError={(e) => {
          console.error(`Failed to load image: ${image}`);
          e.currentTarget.src = "https://placehold.co/600x400/e9e2dd/a17a69?text=Image+Unavailable";
        }}
      />
      <div className="p-6">
        <h3 className="text-2xl font-playfair text-secondary mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <span className="text-primary font-medium">{formatCurrency(price)}</span>
          <Link 
            href={`/treatments/${id}`}
            className="text-secondary hover:text-secondary/80 font-medium flex items-center"
          >
            Learn More <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
