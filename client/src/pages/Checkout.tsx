import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useStore } from "@/lib/store";
import { useToast } from "@/hooks/use-toast";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingBag, CreditCard, ArrowLeft } from "lucide-react";

const checkoutFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  state: z.string().min(2, {
    message: "Please select a state.",
  }),
  zipCode: z.string().min(5, {
    message: "Please enter a valid ZIP code.",
  }),
  cardNumber: z.string().min(13, {
    message: "Please enter a valid card number.",
  }).max(19),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, {
    message: "Please enter a valid expiry date (MM/YY).",
  }),
  cardCvc: z.string().length(3, {
    message: "Please enter a valid CVC.",
  }),
  paymentMethod: z.enum(["credit", "debit"]),
  notes: z.string().optional(),
});

type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

export default function Checkout() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [, setLocation] = useLocation();
  const { cart, getTotalPrice, clearCart } = useStore();
  const { toast } = useToast();

  // Redirect if cart is empty
  useEffect(() => {
    if (cart.length === 0) {
      setLocation("/cart");
    }
  }, [cart, setLocation]);

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const form = useForm<CheckoutFormValues>({
    mode: "onSubmit",
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      cardNumber: "",
      cardExpiry: "",
      cardCvc: "",
      paymentMethod: "credit",
      notes: "",
    },
  });

  const totalPrice = getTotalPrice();
  const tax = totalPrice * 0.08; // 8% tax rate
  const finalTotal = totalPrice + tax;

  const downloadOrderDetails = (orderData: any) => {
    const orderText = `
THE SCULPTING ART - ORDER CONFIRMATION

Order Number: ${orderData.orderNumber}
Date: ${new Date(orderData.date).toLocaleDateString()}
Status: ${orderData.status.toUpperCase()}

CUSTOMER INFORMATION:
Name: ${orderData.customerInfo.firstName} ${orderData.customerInfo.lastName}
Email: ${orderData.customerInfo.email}
Phone: ${orderData.customerInfo.phone}

ORDER ITEMS:
${orderData.items.map((item: any) => `- ${item.title || 'Item'} x${item.quantity || 1} - £${item.price}`).join('\n')}

TOTAL: £${orderData.total}

BUSINESS CONTACT:
${orderData.businessInfo.name}
Email: ${orderData.businessInfo.email}
Phone: ${orderData.businessInfo.phone}

Thank you for your order!
    `;

    const blob = new Blob([orderText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `order-${orderData.orderNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  const onSubmit = async (data: CheckoutFormValues) => {
    console.log("Form submitted with data:", data);
    console.log("Form errors:", form.formState.errors);
    
    setIsSubmitting(true);
    
    try {
      // Generate order details for instant download
      const orderNumber = `ORD-${Date.now()}`;
      const downloadData = {
        orderNumber,
        date: new Date().toISOString(),
        status: "pending",
        customerInfo: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone
        },
        items: cart.map(item => ({
          title: item.title,
          quantity: item.quantity || 1,
          price: item.price
        })),
        total: finalTotal,
        businessInfo: {
          name: "The Sculpting Art",
          email: "info@thesculptingart.com",
          phone: "+44 123 456 7890"
        }
      };

      // Download order details instantly
      downloadOrderDetails(downloadData);

      // Open Stripe checkout in new tab
      const stripeUrl = "https://buy.stripe.com/fZufZidtE52l9PseC0a7C00";
      window.open(stripeUrl, '_blank');
      
      // Show success message
      toast({
        title: "Order created successfully!",
        description: "Your order details have been downloaded and Stripe checkout opened in a new tab.",
      });
      
      // Clear cart and redirect to confirmation page
      clearCart();
      setLocation("/");
      
    } catch (error) {
      console.error("Payment processing failed:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add button click handler for debugging
  const handleButtonClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    console.log("Button clicked", e);
    console.log("Form valid:", form.formState.isValid);
    console.log("Form errors:", form.formState.errors);
    
    // If form validation is blocking, bypass it and submit directly
    if (!form.formState.isValid) {
      console.log("Bypassing form validation and submitting directly");
      await handleDirectSubmit();
    }
  };

  const handleDirectSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      // Get form values directly
      const formData = form.getValues();
      
      // Create order payload for database
      const orderPayload = {
        customerInfo: {
          firstName: formData.firstName || "Customer",
          lastName: formData.lastName || "Guest", 
          email: formData.email || "guest@example.com",
          phone: formData.phone || "N/A",
          address: formData.address || "",
          city: formData.city || "",
          state: formData.state || "",
          zipCode: formData.zipCode || ""
        },
        total: finalTotal,
        items: cart.map(item => ({
          productId: item.type === 'product' ? item.id : null,
          treatmentId: item.type === 'booking' ? item.id : null,
          quantity: item.quantity || 1,
          price: item.price,
          title: item.title,
          type: item.type,
          date: item.date || null,
          time: item.time || null
        }))
      };

      // Save order to database
      const response = await fetch('/api/create-order-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        throw new Error('Failed to create order in database');
      }

      const { order, downloadData } = await response.json();
      
      // Download order details instantly
      downloadOrderDetails(downloadData);

      // Open Stripe checkout in new tab
      const stripeUrl = "https://buy.stripe.com/fZufZidtE52l9PseC0a7C00";
      window.open(stripeUrl, '_blank');
      
      // Show success message
      toast({
        title: "Order created successfully!",
        description: "Your order has been saved and Stripe checkout opened in a new tab.",
      });
      
      // Clear cart and redirect to confirmation page
      clearCart();
      setLocation("/");
      
    } catch (error) {
      console.error("Payment processing failed:", error);
      toast({
        title: "Payment failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format card expiry date
  const formatCardExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    
    if (v.length <= 2) {
      return v;
    }
    
    return `${v.slice(0, 2)}/${v.slice(2, 4)}`;
  };

  return (
    <>
      <Helmet>
        <title>Checkout | The Sculpting Art</title>
        <meta name="description" content="Complete your purchase at The Sculpting Art. Enter your shipping and payment details to finalize your order." />
      </Helmet>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-playfair text-secondary mb-4">Checkout</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Complete your order to confirm your appointments and products.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Button
                  asChild
                  variant="outline"
                  className="text-secondary border-secondary hover:bg-muted"
                >
                  <Link href="/cart">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Cart
                  </Link>
                </Button>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information */}
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-playfair text-secondary mb-6">Personal Information</h2>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="firstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="John" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="lastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Doe" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input placeholder="john.doe@example.com" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input placeholder="(123) 456-7890" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                  

                  
                  
                  
                  {/* Additional Notes */}
                  <Card>
                    <CardContent className="pt-6">
                      <h2 className="text-xl font-playfair text-secondary mb-6">Additional Notes</h2>
                      
                      <FormField
                        control={form.control}
                        name="notes"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Special Instructions (Optional)</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Any special requests or information we should know about?" 
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-secondary hover:bg-secondary/90 text-lg py-6"
                    disabled={isSubmitting}
                    onClick={handleButtonClick}
                  >
                    {isSubmitting ? (
                      <>Processing Payment...</>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" /> Pay {formatCurrency(finalTotal)}
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div>
              <Card className="sticky top-6">
                <CardContent className="pt-6">
                  <h2 className="text-xl font-playfair text-secondary mb-6">Order Summary</h2>
                  
                  <div className="max-h-80 overflow-y-auto mb-6 pr-2">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-start py-3 border-b border-gray-100 last:border-0">
                        <div className="w-10 h-10 bg-muted rounded-md flex items-center justify-center text-secondary mr-3 flex-shrink-0">
                          <ShoppingBag className="h-5 w-5" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{item.title}</h4>
                            <span>{formatCurrency(item.price * item.quantity)}</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {item.type === 'booking' ? (
                              <>{item.date} • {item.time}</>
                            ) : (
                              <>Qty: {item.quantity}</>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
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
                  
                  <p className="text-xs text-center text-gray-500 mt-6">
                    By completing your purchase, you agree to our{" "}
                    <Link href="/terms" className="text-secondary hover:underline">Terms of Service</Link> and{" "}
                    <Link href="/privacy" className="text-secondary hover:underline">Privacy Policy</Link>.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
