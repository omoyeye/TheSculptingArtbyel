import { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
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
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Please enter a valid phone number.",
  }),
  subject: z.string().min(1, {
    message: "Please select a subject.",
  }),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    
    try {
      // In a real app, this would be an API call to send the contact form
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message sent",
        description: "Thank you for contacting us. We'll get back to you soon.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Failed to send message",
        description: "There was an error sending your message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | The Sculpting Art</title>
        <meta name="description" content="Get in touch with The Sculpting Art for questions about our body sculpting treatments, booking information, or general inquiries." />
      </Helmet>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-playfair text-secondary mb-4">Contact Us</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Have questions or want to book an appointment? Get in touch with our team.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-playfair text-secondary mb-6">Send Us a Message</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="Your email address" {...field} />
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
                            <Input placeholder="Your phone number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="booking">Booking Information</SelectItem>
                            <SelectItem value="pricing">Pricing & Packages</SelectItem>
                            <SelectItem value="products">Product Information</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[150px]" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-secondary hover:bg-secondary/90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
            
            <div>
              <h2 className="text-2xl font-playfair text-secondary mb-6">Contact Information</h2>
              
              <div className="bg-muted p-8 rounded-xl">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-secondary/10 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Visit Us</h3>
                      <p className="text-gray-600">
                        123 Wellness Way<br />
                        Beverly Hills, CA 90210
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-secondary/10 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Call Us</h3>
                      <p className="text-gray-600">
                        <a href="tel:+13105550123" className="hover:text-secondary">
                          (310) 555-0123
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-secondary/10 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Email Us</h3>
                      <p className="text-gray-600">
                        <a href="mailto:info@thesculptingart.com" className="hover:text-secondary">
                          info@thesculptingart.com
                        </a>
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-secondary/10 p-2 rounded-full">
                      <Clock className="h-5 w-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-medium text-lg mb-1">Business Hours</h3>
                      <p className="text-gray-600">
                        Monday - Friday: 9am - 7pm<br />
                        Saturday: 10am - 6pm<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 h-64 bg-gray-200 rounded-xl">
                {/* Google Maps Embed would go here in a real implementation */}
                <div className="w-full h-full flex items-center justify-center text-gray-500">
                  Interactive Map
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
