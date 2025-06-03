import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Please enter your email",
        description: "A valid email address is required to subscribe.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        toast({
          title: "Subscription successful!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail("");
      } else {
        const errorData = await response.json();
        toast({
          title: "Subscription failed",
          description: errorData.message || "There was an error subscribing to the newsletter.",
          variant: "destructive"
        });
      }
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: "There was an error subscribing to the newsletter. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-playfair text-white mb-4">Join Our Community</h2>
          <p className="text-lg text-primary-foreground/80 mb-8">
            Subscribe to our newsletter for exclusive offers, body sculpting tips, and wellness insights.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Input
              type="email"
              placeholder="Your email address"
              className="px-4 py-3 rounded-md max-w-md focus:outline-none focus:ring-2 focus:ring-secondary"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-secondary hover:bg-secondary/90 text-white"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          
          <p className="text-primary-foreground/80 text-sm mt-4">
            By subscribing you agree to receive our promotional emails and can unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
}
