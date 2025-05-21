import { Helmet } from "react-helmet";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import BusinessHours from "@/components/BusinessHours";

export default function Pricing() {
  return (
    <>
      <Helmet>
        <title>Pricing & Packages | The Sculpting Art</title>
        <meta 
          name="description" 
          content="View our complete treatment pricing and special packages for body sculpting, lymphatic drainage, and other wellness services at The Sculpting Art." 
        />
      </Helmet>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-playfair text-secondary mb-4">Our Pricing & Packages</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We offer a range of individual treatments and comprehensive packages to help you achieve your body sculpting goals.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="col-span-2">
              {/* Individual Treatments */}
              <h2 className="text-3xl font-playfair text-secondary mb-4">Individual Treatments</h2>
              
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-8">
                <p className="text-sm text-blue-800">
                  <strong>Note:</strong> A £20 deposit is required for all treatments at the time of booking. This amount will be deducted from the total price of your service.
                </p>
              </div>
              
              <div className="mb-12 space-y-10">
                <div>
                  <h3 className="text-xl font-playfair text-secondary mb-4 border-b border-gray-200 pb-2">Wood Therapy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-lg">30 Minutes</span>
                        <span className="text-primary font-bold">£40.00</span>
                      </div>
                      <p className="text-gray-600 text-sm">Quick targeted treatment for specific areas</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-lg">60 Minutes</span>
                        <span className="text-primary font-bold">£56.99</span>
                      </div>
                      <p className="text-gray-600 text-sm">Full treatment with comprehensive approach</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-playfair text-secondary mb-4 border-b border-gray-200 pb-2">Lymphatic Drainage Massage</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-lg">30 Minutes</span>
                        <span className="text-primary font-bold">£39.00</span>
                      </div>
                      <p className="text-gray-600 text-sm">Targeted lymphatic system stimulation</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-lg">45 Minutes</span>
                        <span className="text-primary font-bold">£47.00</span>
                      </div>
                      <p className="text-gray-600 text-sm">Extended session for deeper detoxification</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-playfair text-secondary mb-4 border-b border-gray-200 pb-2">Recovery Boost (Post-Op Drainage)</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-lg">30 Minutes</span>
                        <span className="text-primary font-bold">£45.00</span>
                      </div>
                      <p className="text-gray-600 text-sm">Essential post-operative care</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-lg">60 Minutes</span>
                        <span className="text-primary font-bold">£55.90</span>
                      </div>
                      <p className="text-gray-600 text-sm">Comprehensive recovery support</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-playfair text-secondary mb-4 border-b border-gray-200 pb-2">Laser & Ultrasound Treatments</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-lg">Laser Lipo (45 Min)</span>
                        <span className="text-primary font-bold">£77.00</span>
                      </div>
                      <p className="text-gray-600 text-sm">Advanced technology to break down fat cells</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-lg">Cavitation (45 Min)</span>
                        <span className="text-primary font-bold">£77.00</span>
                      </div>
                      <p className="text-gray-600 text-sm">Ultrasound treatment for stubborn fat</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm md:col-span-2">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-lg">Cavitation & Vacuum (60 Min)</span>
                        <span className="text-primary font-bold">£90.00</span>
                      </div>
                      <p className="text-gray-600 text-sm">Combined treatment for enhanced results</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-xl font-playfair text-secondary mb-4 border-b border-gray-200 pb-2">Massage Therapy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-lg">Deep Tissue (45 Min)</span>
                        <span className="text-primary font-bold">£39.00</span>
                      </div>
                      <p className="text-gray-600 text-sm">Focuses on deeper muscle layers</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-lg">Relaxing (45 Min)</span>
                        <span className="text-primary font-bold">£39.00</span>
                      </div>
                      <p className="text-gray-600 text-sm">Gentle massage for stress relief</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Package Deals */}
              <h2 className="text-3xl font-playfair text-secondary mb-8">Treatment Packages</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-xl font-playfair text-secondary mb-2">Package One</h3>
                  <div className="text-3xl font-bold text-primary mb-4">£245</div>
                  <p className="text-sm text-gray-600 mb-6">Experience the benefits of body sculpting with targeted treatments for one specific area.</p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>3 Sessions (2 hours each)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Focus on one specific area</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Personalized approach</span>
                    </li>
                  </ul>
                  
                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border-2 border-secondary relative">
                  <div className="absolute top-0 right-0 bg-secondary text-white px-3 py-1 text-xs font-medium transform translate-y-[-50%]">
                    MOST POPULAR
                  </div>
                  <h3 className="text-xl font-playfair text-secondary mb-2">Package Two</h3>
                  <div className="text-3xl font-bold text-primary mb-4">£420</div>
                  <p className="text-sm text-gray-600 mb-6">Transform with six targeted sessions, reducing fat and tightening skin for noticeable results.</p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>6 Sessions (2 hours each)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Focus on one specific area</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Progressive treatment plan</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Visible transformation</span>
                    </li>
                  </ul>
                  
                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
                  <h3 className="text-xl font-playfair text-secondary mb-2">Package Three</h3>
                  <div className="text-3xl font-bold text-primary mb-4">£620</div>
                  <p className="text-sm text-gray-600 mb-6">Complete transformation with nine sessions for exceptional, lasting results in your target area.</p>
                  
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>9 Sessions (2 hours each)</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Focus on one specific area</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Comprehensive treatment</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Long-lasting results</span>
                    </li>
                    <li className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>Maximum value</span>
                    </li>
                  </ul>
                  
                  <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                    <Link href="/booking">Book Now</Link>
                  </Button>
                </div>
              </div>
              
              <div className="bg-muted p-6 rounded-lg border border-gray-200">
                <h3 className="text-lg font-medium mb-2">Need a Custom Plan?</h3>
                <p className="text-gray-600 mb-4">
                  We can create a personalized treatment package tailored to your specific needs and goals.
                </p>
                <Button asChild variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white">
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            
            <div>
              <BusinessHours />
              
              <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-playfair text-secondary mb-4">Book Your Consultation</h3>
                <p className="text-gray-600 mb-6">
                  Not sure which treatment is right for you? Schedule a consultation with our experts to discuss your goals and create a personalized plan.
                </p>
                <Button asChild className="w-full bg-secondary hover:bg-secondary/90">
                  <Link href="/booking">Book Consultation</Link>
                </Button>
              </div>
              
              <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-playfair text-secondary mb-4">Payment Options</h3>
                <p className="text-gray-600 mb-4">
                  We accept all major credit cards, cash, and bank transfers. Packages can be paid in full or with an installment plan.
                </p>
                <p className="text-sm text-gray-500">
                  Please note that a 24-hour cancellation notice is required to avoid a cancellation fee.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}