import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { useCallback } from "react";

export default function FeaturedProducts() {
  const { products, addToCart } = useStore();
  const { toast } = useToast();

  const handleAddToCart = useCallback((productId: string) => {
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
  }, [products, addToCart, toast]);

  const getImagePath = useCallback((filename: string) => {
    try {
      const path = new URL(`@assets/${filename}`, import.meta.url).href;
      return path;
    } catch (error) {
      console.error("Error loading image:", error);
      return "";
    }
  }, []);

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-playfair text-secondary mb-4">
            Products We Love
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Enhance your at-home body care routine with our curated selection of premium wellness products.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div key={product.id} className="bg-white rounded-xl overflow-hidden shadow-lg group">
              <div className="relative overflow-hidden">
                <Link href={`/products/${product.id}`}>
                  <img 
                    src={getImagePath(product.image)} 
                    alt={product.title} 
                    className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-500" 
                  />
                </Link>
                {product.badge && (
                  <div className={`absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-md ${
                    product.badge === 'NEW' 
                      ? 'bg-primary' 
                      : product.badge === 'BEST SELLER' 
                        ? 'bg-accent' 
                        : 'bg-secondary'
                  }`}>
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-playfair text-secondary hover:text-secondary/80">
                    {product.title}
                  </h3>
                </Link>
                <p className="text-gray-500 text-sm mb-2">{product.description.split(' ').slice(0, 3).join(' ')}</p>
                <div className="flex justify-between items-center">
                  <span className="font-medium">${product.price.toFixed(2)}</span>
                  <button 
                    className="text-secondary hover:text-secondary/80"
                    onClick={() => handleAddToCart(product.id)}
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <ShoppingBag className="h-5 w-5" />
                  </button>
                </div>
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
            <Link href="/products">Shop All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
