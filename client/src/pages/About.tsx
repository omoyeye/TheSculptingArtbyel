import { Helmet } from "react-helmet";
import { CheckCircle, Award, Heart, Users } from "lucide-react";
import Newsletter from "@/components/Newsletter";
import { useCallback } from "react";

export default function About() {
  const getImagePath = useCallback(() => {
    try {
      const path = new URL(`@assets/images/Beige Nude Aesthetic Feminine Modern Gynecology Health Clinic Branding Logo.png`, import.meta.url).href;
      return path;
    } catch (error) {
      console.error("Error loading image:", error);
      return "";
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>About Us | The Sculpting Art</title>
        <meta name="description" content="Learn about The Sculpting Art's mission, our expert team, and our commitment to enhancing your natural beauty through innovative body sculpting techniques." />
      </Helmet>

      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6">
            <h1 className="text-4xl md:text-5xl font-playfair text-secondary mb-4">About The Sculpting Art</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Discover our story and commitment to transformative body sculpting and wellness.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair text-secondary mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 mb-6">
                At The Sculpting Art, we believe that true beauty emerges when wellness and 
                confidence align. Founded with the vision of providing revolutionary body 
                sculpting techniques in a luxurious, nurturing environment, our spa has become 
                a sanctuary for those seeking to enhance their natural beauty.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                What began as a small specialized clinic has evolved into a premier destination 
                for non-invasive body sculpting and wellness treatments. Our journey has been 
                driven by a passion for helping clients achieve their ideal body goals through 
                methods that honor and respect the body's natural processes.
              </p>
              <p className="text-lg text-gray-600">
                Today, we're proud to offer a comprehensive suite of treatments that combine 
                time-honored techniques with cutting-edge technology, all delivered in a 
                serene environment designed to nurture both body and spirit.
              </p>
            </div>
            <div className="flex justify-center">
              <img 
                src={getImagePath()} 
                alt="The Sculpting Art Logo" 
                className="max-w-md w-full"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair text-secondary mb-4">Our Philosophy</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We're guided by core principles that ensure every client receives 
              exceptional care and transformative results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-playfair text-secondary mb-3">Holistic Approach</h3>
              <p className="text-gray-600">
                We believe in treating the whole person, not just targeting problem areas.
                Our approach combines physical treatments with wellness practices.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-playfair text-secondary mb-3">Excellence in Service</h3>
              <p className="text-gray-600">
                We're committed to delivering exceptional service with every treatment,
                ensuring each client receives personalized attention and care.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-playfair text-secondary mb-3">Proven Results</h3>
              <p className="text-gray-600">
                We use scientifically-backed techniques and advanced technologies
                that deliver visible, lasting results for our clients.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-playfair text-secondary mb-3">Expert Therapists</h3>
              <p className="text-gray-600">
                Our team consists of highly trained professionals who are passionate
                about their craft and dedicated to your transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-playfair text-secondary mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Our skilled professionals bring years of expertise and a passion for transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary text-4xl font-playfair">EL</span>
              </div>
              <h3 className="text-xl font-playfair text-secondary mb-1">Elena Lorenzo</h3>
              <p className="text-primary font-medium mb-3">Founder & Lead Therapist</p>
              <p className="text-gray-600 mb-4">
                With over 15 years of experience in body sculpting and wellness treatments,
                Elena founded The Sculpting Art to share her innovative techniques.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary text-4xl font-playfair">JR</span>
              </div>
              <h3 className="text-xl font-playfair text-secondary mb-1">James Rodriguez</h3>
              <p className="text-primary font-medium mb-3">Senior Body Sculptor</p>
              <p className="text-gray-600 mb-4">
                James specializes in advanced body contouring techniques and
                has helped hundreds of clients achieve their dream physique.
              </p>
            </div>

            <div className="text-center">
              <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-primary text-4xl font-playfair">SN</span>
              </div>
              <h3 className="text-xl font-playfair text-secondary mb-1">Sofia Nguyen</h3>
              <p className="text-primary font-medium mb-3">Wellness Specialist</p>
              <p className="text-gray-600 mb-4">
                Sofia combines traditional Eastern practices with modern techniques
                to provide holistic treatments that balance body and mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
