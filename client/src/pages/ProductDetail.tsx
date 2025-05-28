import { useEffect, useState, useCallback } from "react";
import { Helmet } from "react-helmet";
import { useParams, useLocation } from "wouter";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Minus, Plus, ShoppingBag } from "lucide-react";
import Newsletter from "@/components/Newsletter";
import ProductReviews from "@/components/ProductReviews";
import { getImage } from "@/assets/imageImports";

export default function ProductDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { products, addToCart } = useStore();
  const { toast } = useToast();
  const [product, setProduct] = useState(products.find(p => p.id === params.id));
  const [quantity, setQuantity] = useState(1);

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
    // Find the product with the matching ID
    const foundProduct = products.find(p => p.id === params.id);
    
    if (!foundProduct) {
      // If product not found, redirect to products page
      setLocation("/products");
      return;
    }
    
    setProduct(foundProduct);
  }, [params.id, products, setLocation]);

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      type: 'product',
      itemId: product.id,
      title: product.title,
      price: product.price,
      quantity: quantity,
      image: product.image
    });
    
    toast({
      title: "Added to cart",
      description: `${quantity} ${quantity === 1 ? 'item' : 'items'} of ${product.title} added to your cart.`
    });
  };

  if (!product) return null;

  return (
    <>
      <Helmet>
        <title>{product.title} | The Sculpting Art</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="flex flex-col space-y-2">
            <h1 className="text-4xl md:text-5xl font-playfair text-secondary">{product.title}</h1>
            <p className="text-lg text-gray-600">
              {product.category}
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
                  src={getImagePath(product.image)} 
                  alt={product.title}
                  className="w-full h-auto object-cover" 
                />
              </div>
            </div>
            
            <div>
              {product.badge && (
                <span className={`inline-block px-3 py-1 text-xs font-bold text-white rounded-full mb-4 ${
                  product.badge === 'NEW' 
                    ? 'bg-primary' 
                    : product.badge === 'BEST SELLER' 
                      ? 'bg-accent' 
                      : 'bg-secondary'
                }`}>
                  {product.badge}
                </span>
              )}
              
              <h2 className="text-3xl font-playfair text-secondary mb-4">
                £{product.price.toFixed(2)}
              </h2>
              
              <div className="prose max-w-none mb-8">
                <p className="text-lg text-gray-700">
                  {product.description}
                </p>
                
                <p className="text-sm text-gray-500 mt-4">
                  A premium product specially formulated to enhance your body sculpting treatment results.
                  Our products are made with high-quality ingredients and are free from harsh chemicals.
                </p>
              </div>
              
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-md">
                  <button 
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={decreaseQuantity}
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button 
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100"
                    onClick={increaseQuantity}
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                
                <Button 
                  className="bg-secondary hover:bg-secondary/90 text-white flex items-center space-x-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
              </div>
              
              <div className="text-sm text-gray-600 space-y-3 border-t border-gray-200 pt-6">
                <p className="flex items-center">
                  <span className="font-medium mr-2">Category:</span> {product.category}
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2">Product ID:</span> {product.id}
                </p>
                <p className="flex items-center">
                  <span className="font-medium mr-2">Shipping:</span> Free shipping on orders over £100
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Reviews Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <ProductReviews productId={product.id} />
        </div>
      </section>

      <Newsletter />
    </>
  );
}
