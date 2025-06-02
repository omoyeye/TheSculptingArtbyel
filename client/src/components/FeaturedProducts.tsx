
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { getImage } from "@/assets/imageImports";

export default function FeaturedProducts() {
  const { products, addToCart } = useStore();
  const { toast } = useToast();

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    addToCart({
      type: 'product',
      itemId: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
      image: product.image
    });

    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`
    });
  };

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair text-secondary mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete your body sculpting journey with our premium waist trainers designed for maximum comfort and results.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="aspect-square overflow-hidden">
                <img 
                  src={getImage(product.image)} 
                  alt={product.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-secondary">{product.title}</h3>
                  {product.badge && (
                    <span className="bg-primary text-white px-2 py-1 rounded-full text-xs font-medium">
                      {product.badge}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-primary">£{product.price}</span>
                  <Button 
                    onClick={() => handleAddToCart(product.id)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90">
            <Link href="/products">
              View All Products
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
