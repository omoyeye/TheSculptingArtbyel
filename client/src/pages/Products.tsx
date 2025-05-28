import { useState } from "react";
import { Helmet } from "react-helmet";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "wouter";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCallback } from "react";

// Get all unique categories from products
const getCategories = (products: any[]) => {
  const categories = products.map(p => p.category);
  return [...new Set(categories)];
};

export default function Products() {
  const { products, addToCart } = useStore();
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { toast } = useToast();
  
  const categories = getCategories(products);

  const getImagePath = useCallback((filename: string) => {
    try {
      const path = new URL(`@assets/${filename}`, import.meta.url).href;
      return path;
    } catch (error) {
      console.error("Error loading image:", error);
      return "";
    }
  }, []);

  const filteredProducts = products.filter(product => {
    if (selectedCategories.length === 0) return true;
    return selectedCategories.includes(product.category);
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    // Default: featured
    return 0;
  });

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

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSortBy("featured");
  };

  return (
    <>
      <Helmet>
        <title>Products | The Sculpting Art</title>
        <meta name="description" content="Shop our premium collection of body sculpting and wellness products to enhance your treatment results and self-care routine." />
      </Helmet>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-playfair text-secondary mb-4">Shop Our Products</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Enhance your at-home body care routine with our curated selection of premium wellness products.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div className="lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Filter className="h-4 w-4" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <div className="py-4">
                    <h3 className="text-lg font-medium mb-4">Categories</h3>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`mobile-${category}`} 
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <Label htmlFor={`mobile-${category}`}>{category}</Label>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="my-6" />
                    
                    <h3 className="text-lg font-medium mb-4">Sort By</h3>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Sort products" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="featured">Featured</SelectItem>
                        <SelectItem value="price-low">Price: Low to High</SelectItem>
                        <SelectItem value="price-high">Price: High to Low</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button onClick={clearFilters} variant="ghost" className="mt-6 w-full">
                      Clear Filters
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            
            <div className="hidden lg:block">
              <span className="text-gray-600">
                Showing {sortedProducts.length} of {products.length} products
              </span>
            </div>
            
            <div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Filters (Desktop) */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-medium mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={category} 
                        checked={selectedCategories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={category}>{category}</Label>
                    </div>
                  ))}
                </div>
                
                {selectedCategories.length > 0 && (
                  <Button onClick={clearFilters} variant="ghost" className="mt-4 w-full">
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
            
            {/* Product Grid */}
            <div className="lg:col-span-3">
              {sortedProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-lg text-gray-600">No products found matching your filters.</p>
                  <Button onClick={clearFilters} className="mt-4 bg-secondary hover:bg-secondary/90">
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {sortedProducts.map(product => (
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
                          <span className="font-medium">£{product.price.toFixed(2)}</span>
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
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
