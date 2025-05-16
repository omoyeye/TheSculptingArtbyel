import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  MapPin, 
  Phone, 
  Mail 
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="bg-secondary-900 text-black pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: About */}
          <div>
            <div className="mb-6">
              <span className="text-black font-playfair text-2xl font-semibold">
                THE SCULPTING ART
              </span>
            </div>
            <p className="text-black mb-6">
              Luxury body sculpting and wellness spa dedicated to enhancing your
              natural beauty through innovative, non-invasive treatments.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700 transition duration-300"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700 transition duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700 transition duration-300"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:text-gray-700 transition duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-playfair mb-6 text-black">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-black hover:text-gray-700 transition duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="text-black hover:text-gray-700 transition duration-300">
                  Treatments
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-black hover:text-gray-700 transition duration-300">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-black hover:text-gray-700 transition duration-300">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-black hover:text-gray-700 transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-black hover:text-gray-700 transition duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div>
            <h3 className="text-lg font-playfair mb-6 text-black">Our Treatments</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/treatments/wood-therapy" className="text-black hover:text-gray-700 transition duration-300">
                  Wood Therapy
                </Link>
              </li>
              <li>
                <Link href="/treatments/cavitation-vacuum" className="text-black hover:text-gray-700 transition duration-300">
                  Cavitation & Vacuum
                </Link>
              </li>
              <li>
                <Link href="/treatments/lymphatic-drainage" className="text-black hover:text-gray-700 transition duration-300">
                  Lymphatic Drainage
                </Link>
              </li>
              <li>
                <Link href="/treatments/recovery-boost" className="text-black hover:text-gray-700 transition duration-300">
                  RecoveryBoost
                </Link>
              </li>
              <li>
                <Link href="/treatments/laser-lipo" className="text-black hover:text-gray-700 transition duration-300">
                  Laser Lipo
                </Link>
              </li>
              <li>
                <Link href="/treatments" className="text-black hover:text-gray-700 transition duration-300">
                  Custom Packages
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h3 className="text-lg font-playfair mb-6 text-black">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-black mt-1 mr-3" />
                <span className="text-black">
                  123 Wellness Way<br />Beverly Hills, CA 90210
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-black mr-3" />
                <a
                  href="tel:+13105550123"
                  className="text-black hover:text-gray-700 transition duration-300"
                >
                  (310) 555-0123
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-black mr-3" />
                <a
                  href="mailto:info@thesculptingart.com"
                  className="text-black hover:text-gray-700 transition duration-300"
                >
                  info@thesculptingart.com
                </a>
              </li>
              <li className="flex items-center mt-4">
                <Button asChild className="bg-secondary hover:bg-secondary/90 text-white">
                  <Link href="/booking">Book Appointment</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 text-center text-black text-sm">
          <p>&copy; {new Date().getFullYear()} The Sculpting Art. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/privacy" className="text-black hover:text-gray-700 transition duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-black hover:text-gray-700 transition duration-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
