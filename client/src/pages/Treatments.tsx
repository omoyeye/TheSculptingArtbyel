import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import TreatmentCard from "@/components/TreatmentCard";

export default function Treatments() {
  const { data: treatments = [] } = useQuery({
    queryKey: ['/api/treatments']
  });

  return (
    <>
      <Helmet>
        <title>Treatments | The Sculpting Art</title>
        <meta name="description" content="Discover our range of professional body sculpting treatments including Wood Therapy, Cavitation & Vacuum, Lymphatic Drainage, and more." />
      </Helmet>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-playfair text-secondary mb-4">Our Treatments</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our specialized body sculpting therapies designed to help you achieve your body goals through non-invasive, effective techniques.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.isArray(treatments) && treatments.map((treatment: any) => (
              <TreatmentCard key={treatment.id} treatment={treatment} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
