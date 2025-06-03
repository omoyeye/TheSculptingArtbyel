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
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        toast({
          title: "Message sent",
          description: "Thank you for contacting us. We'll get back to you soon.",
        });
        form.reset();
      } else {
        throw new Error('Failed to send message');
      }
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
            <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg">
              <h2 className="text-2xl font-playfair text-secondary mb-6 font-bold">Send Us a Message</h2>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-800 font-semibold text-sm">Name</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Your full name" 
                            className="border-2 border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-white text-gray-900 placeholder:text-gray-500" 
                            {...field} 
                          />
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
                          <FormLabel className="text-gray-800 font-semibold text-sm">Email</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your email address" 
                              className="border-2 border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-white text-gray-900 placeholder:text-gray-500" 
                              {...field} 
                            />
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
                          <FormLabel className="text-gray-800 font-semibold text-sm">Phone</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your phone number" 
                              className="border-2 border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-white text-gray-900 placeholder:text-gray-500" 
                              {...field} 
                            />
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
                        <FormLabel className="text-gray-800 font-semibold text-sm">Subject</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-2 border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-white text-gray-900">
                              <SelectValue placeholder="Select a subject" className="text-gray-500" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white border-2 border-gray-200">
                            <SelectItem value="general" className="text-gray-900 hover:bg-secondary/10">General Inquiry</SelectItem>
                            <SelectItem value="booking" className="text-gray-900 hover:bg-secondary/10">Booking Information</SelectItem>
                            <SelectItem value="pricing" className="text-gray-900 hover:bg-secondary/10">Pricing & Packages</SelectItem>
                            <SelectItem value="products" className="text-gray-900 hover:bg-secondary/10">Product Information</SelectItem>
                            <SelectItem value="other" className="text-gray-900 hover:bg-secondary/10">Other</SelectItem>
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
                        <FormLabel className="text-gray-800 font-semibold text-sm">Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="How can we help you?" 
                            className="min-h-[150px] border-2 border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/20 bg-white text-gray-900 placeholder:text-gray-500" 
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button 
                    type="submit" 
                    className="w-full bg-secondary hover:bg-secondary/90 text-white font-semibold py-3 text-base shadow-lg hover:shadow-xl transition-all duration-200"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>

            <div>
              <h2 className="text-2xl font-playfair text-secondary mb-6 font-bold">Contact Information</h2>

              <div className="bg-secondary/5 border-2 border-secondary/20 p-8 rounded-xl shadow-lg">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-secondary p-3 rounded-full shadow-md">
                      <MapPin className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">Visit Us</h3>
                      <p className="text-gray-700 font-medium">
                        Manchester<br />
                        United Kingdom
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-secondary p-3 rounded-full shadow-md">
                      <Phone className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">Call Us</h3>
                      <p className="text-gray-700 font-medium">
                        <a href="tel:+447570618832" className="hover:text-secondary font-semibold transition-colors duration-200">
                          +447570618832
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-secondary p-3 rounded-full shadow-md">
                      <Mail className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">Email Us</h3>
                      <p className="text-gray-700 font-medium">
                        <a href="mailto:Businesselom@gmail.com" className="hover:text-secondary font-semibold transition-colors duration-200">
                          Businesselom@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="mt-1 mr-4 bg-secondary p-3 rounded-full shadow-md">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2 text-gray-900">Business Hours</h3>
                      <p className="text-gray-700 font-medium">
                        Monday: Closed<br />
                        Tuesday - Sunday: 8am - 5pm
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 h-64 rounded-xl shadow-inner overflow-hidden border-2 border-gray-200">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9487.642849526936!2d-2.2426!3d53.4808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487bb1b3e3d0c3d3%3A0x2acd4fcd2bc9b244!2sManchester%2C%20UK!5e0!3m2!1sen!2sus!4v1633024800000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="The Sculpting Art Location - Manchester, UK"
                  className="rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}