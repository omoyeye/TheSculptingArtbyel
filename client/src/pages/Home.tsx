import { Helmet } from "react-helmet";
import HeroSlider from "@/components/HeroSlider";
import FeaturedTreatments from "@/components/FeaturedTreatments";
import BeforeAfterResults from "@/components/BeforeAfterResults";
import BookingSection from "@/components/BookingSection";
import FeaturedProducts from "@/components/FeaturedProducts";
import BrandStory from "@/components/BrandStory";
import Testimonials from "@/components/Testimonials";
import InstagramFeed from "@/components/InstagramFeed";
import Newsletter from "@/components/Newsletter";

export default function Home() {
  return (
    <>
      <Helmet>
        <title>The Sculpting Art - Luxury Body Sculpting & Wellness Spa</title>
        <meta name="description" content="Experience transformative body sculpting and wellness treatments at The Sculpting Art. Our professional spa offers Wood Therapy, Cavitation, Lymphatic Drainage, and more." />
      </Helmet>
      
      <HeroSlider />
      <FeaturedTreatments />
      <BeforeAfterResults />
      <BookingSection />
      <FeaturedProducts />
      <BrandStory />
      <Testimonials />
      <InstagramFeed />
      <Newsletter />
    </>
  );
}
