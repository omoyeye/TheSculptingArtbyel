import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/utils";
import { Link } from "wouter";
import { useCallback } from "react";

export default function CartSidebar() {
  const { 
    cartOpen, 
    setCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    getTotalPrice,
    clearCart
  } = useStore();

  const totalPrice = getTotalPrice();
  const tax = totalPrice * 0.08; // 8% tax rate
  const finalTotal = totalPrice + tax;

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

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setCartOpen(false)}>
      <div 
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-playfair text-secondary">Your Cart</h2>
            <button 
              className="text-gray-500 hover:text-secondary"
              onClick={() => setCartOpen(false)}
              aria-label="Close cart"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {cart.length === 0 ? (
            <div className="flex-grow flex flex-col items-center justify-center text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium mb-2">Your cart is empty</h3>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added anything to your cart yet.
              </p>
              <Button 
                onClick={() => setCartOpen(false)}
                className="bg-secondary hover:bg-secondary/90"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-grow overflow-y-auto mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="border-b border-gray-200 pb-4 mb-4">
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
                        <h4 className="font-medium">{item.title}</h4>
                        {item.type === 'booking' ? (
                          <p className="text-gray-500 text-sm">
                            {item.date} • {item.time}
                          </p>
                        ) : null}
                        
                        <div className="flex justify-between items-center mt-2">
                          {item.type === 'product' ? (
                            <div className="flex items-center border rounded-md">
                              <button 
                                className="px-2 py-1 text-gray-600"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-2 py-1">{item.quantity}</span>
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
                              {item.duration} min session
                            </span>
                          )}
                          <span className="font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                      
                      <button 
                        className="text-gray-400 hover:text-red-500 ml-2"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove from cart"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span className="font-medium">{formatCurrency(totalPrice)}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Tax</span>
                  <span className="font-medium">{formatCurrency(tax)}</span>
                </div>
                <Separator className="my-3" />
                <div className="flex justify-between font-medium text-lg mt-4">
                  <span>Total</span>
                  <span>{formatCurrency(finalTotal)}</span>
                </div>
              </div>
              
              <Button 
                asChild
                className="bg-secondary hover:bg-secondary/90 text-white w-full"
              >
                <Link href="/checkout" onClick={() => setCartOpen(false)}>
                  Proceed to Checkout
                </Link>
              </Button>
              
              <button
                className="mt-4 text-sm text-center text-gray-500 hover:text-secondary underline"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
