import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { useCallback } from "react";

export default function Cart() {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice,
    clearCart
  } = useStore();

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getImagePath = useCallback((filename?: string) => {
    if (!filename) return "";
    try {
      const path = new URL(`@assets/${filename}`, import.meta.url).href;
      return path;
    } catch (error) {
      console.error("Error loading image:", error);
      return "";
    }
  }, []);

  const totalPrice = getTotalPrice();
  const tax = totalPrice * 0.08; // 8% tax rate
  const finalTotal = totalPrice + tax;

  return (
    <>
      <Helmet>
        <title>Shopping Cart | The Sculpting Art</title>
        <meta name="description" content="Review and manage the items in your shopping cart before proceeding to checkout." />
      </Helmet>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-playfair text-secondary mb-4">Your Cart</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Review and manage the items in your cart before proceeding to checkout.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-muted rounded-full mb-6">
                <ShoppingBag className="h-12 w-12 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-playfair text-secondary mb-4">Your cart is empty</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you haven't added any items to your cart yet. 
                Explore our treatments and products to find the perfect one for you.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild className="bg-secondary hover:bg-secondary/90">
                  <Link href="/treatments">Explore Treatments</Link>
                </Button>
                <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-muted">
                  <Link href="/products">Shop Products</Link>
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-playfair text-secondary">Cart Items</h2>
                    <button
                      className="text-sm text-gray-500 hover:text-secondary underline"
                      onClick={clearCart}
                    >
                      Clear Cart
                    </button>
                  </div>
                  
                  {cart.map((item) => (
                    <div key={item.id} className="border-b border-gray-200 pb-6 mb-6 last:border-0 last:pb-0 last:mb-0">
                      <div className="flex items-start">
                        {item.image ? (
                          <img 
                            src={getImagePath(item.image)} 
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded-md mr-4" 
                          />
                        ) : (
                          <div className="w-20 h-20 bg-muted rounded-md flex items-center justify-center text-secondary mr-4">
                            <ShoppingBag className="h-6 w-6" />
                          </div>
                        )}
                        
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h3 className="font-medium">{item.title}</h3>
                            <button 
                              className="text-gray-400 hover:text-red-500 ml-2"
                              onClick={() => removeFromCart(item.id)}
                              aria-label="Remove from cart"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          
                          {item.type === 'booking' ? (
                            <div className="text-gray-500 text-sm mt-1">
                              {item.date} • {item.time} • {item.duration} minutes
                            </div>
                          ) : null}
                          
                          <div className="flex justify-between items-center mt-4">
                            {item.type === 'product' ? (
                              <div className="flex items-center border rounded-md">
                                <button 
                                  className="px-2 py-1 text-gray-600"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="h-3 w-3" />
                                </button>
                                <span className="px-4 py-1">{item.quantity}</span>
                                <button 
                                  className="px-2 py-1 text-gray-600"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="h-3 w-3" />
                                </button>
                              </div>
                            ) : (
                              <span className="text-primary text-sm">
                                Non-refundable booking
                              </span>
                            )}
                            <span className="font-medium">
                              {formatCurrency(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button 
                    asChild 
                    variant="outline" 
                    className="border-secondary text-secondary hover:bg-muted"
                  >
                    <Link href="/products">
                      Continue Shopping
                    </Link>
                  </Button>
                  
                  <Button 
                    asChild 
                    className="bg-secondary hover:bg-secondary/90 hidden lg:inline-flex"
                  >
                    <Link href="/checkout">
                      Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="lg:col-span-1">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-playfair text-secondary mb-6">Order Summary</h2>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span>{formatCurrency(totalPrice)}</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tax (8%)</span>
                        <span>{formatCurrency(tax)}</span>
                      </div>
                      
                      <Separator className="my-3" />
                      
                      <div className="flex justify-between text-lg font-medium">
                        <span>Total</span>
                        <span>{formatCurrency(finalTotal)}</span>
                      </div>
                    </div>
                    
                    <Button 
                      asChild 
                      className="w-full mt-6 bg-secondary hover:bg-secondary/90"
                    >
                      <Link href="/checkout">
                        Proceed to Checkout
                      </Link>
                    </Button>
                    
                    <p className="text-xs text-center text-gray-500 mt-4">
                      Taxes and shipping calculated at checkout. Appointments require a 24-hour cancellation notice for refunds.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
