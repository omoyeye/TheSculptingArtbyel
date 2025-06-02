import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useStore } from "@/lib/store";
import logoPng from "@assets/Beige Nude Aesthetic Feminine Modern Gynecology Health Clinic Branding Logo.png";
import { useSettings } from "@/hooks/use-settings";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { setCartOpen, getTotalItems } = useStore();
  const totalItems = getTotalItems();
  const { settings } = useSettings();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const openCart = () => {
    setCartOpen(true);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  const treatments = [
    { name: "Wood Therapy", href: "/treatments/wood-therapy" },
    { name: "Cavitation & Vacuum", href: "/treatments/cavitation-vacuum" },
    { name: "Lymphatic Drainage", href: "/treatments/lymphatic-drainage" },
    { name: "RecoveryBoost", href: "/treatments/recovery-boost" },
    { name: "Laser Lipo", href: "/treatments/laser-lipo" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <img src={logoPng} alt="The Sculpting Art Logo" className="h-12 mr-2" />
            <span className="text-secondary font-playfair text-2xl font-semibold">
              THE SCULPTING ART
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link
              href="/"
              className={`text-secondary hover:text-secondary/80 font-medium ${
                isActive("/") ? "border-b-2 border-secondary" : ""
              }`}
            >
              Home
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className={`flex items-center text-secondary hover:text-secondary/80 font-medium ${
                    location.startsWith("/treatments") ? "border-b-2 border-secondary" : ""
                  }`}
                >
                  Treatments <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {treatments.map((treatment) => (
                  <DropdownMenuItem key={treatment.href} asChild>
                    <Link
                      href={treatment.href}
                      className="block px-4 py-2 text-sm text-secondary hover:bg-muted"
                    >
                      {treatment.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/products"
              className={`text-secondary hover:text-secondary/80 font-medium ${
                isActive("/products") ? "border-b-2 border-secondary" : ""
              }`}
            >
              Products
            </Link>

            <Link
              href="/gallery"
              className={`text-secondary hover:text-secondary/80 font-medium ${
                isActive("/gallery") ? "border-b-2 border-secondary" : ""
              }`}
            >
              Gallery
            </Link>

            <Link
              href="/pricing"
              className={`text-secondary hover:text-secondary/80 font-medium ${
                isActive("/pricing") ? "border-b-2 border-secondary" : ""
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/about"
              className={`text-secondary hover:text-secondary/80 font-medium ${
                isActive("/about") ? "border-b-2 border-secondary" : ""
              }`}
            >
              About
            </Link>

            <Link
              href="/contact"
              className={`text-secondary hover:text-secondary/80 font-medium ${
                isActive("/contact") ? "border-b-2 border-secondary" : ""
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              className="text-secondary hover:text-secondary/80"
              onClick={toggleMobileMenu}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Cart & Booking Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={openCart}
              className="text-secondary hover:text-secondary/80 relative"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Button asChild variant="default" className="bg-secondary hover:bg-secondary/90">
              <Link href="/booking">{settings?.bookingEnabled ? "Book Now" : "Bookings Disabled"}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white pb-4 px-4 space-y-3 border-t border-gray-100">
          <div className="flex justify-end pt-2 pb-4">
            <button
              className="text-secondary hover:text-secondary/80"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <Link
            href="/"
            className="block py-2 text-secondary hover:text-secondary/80 font-medium border-b border-gray-100"
            onClick={closeMobileMenu}
          >
            Home
          </Link>

          <div className="relative border-b border-gray-100">
            <button
              className="w-full flex justify-between items-center py-2 text-secondary hover:text-secondary/80 font-medium"
              onClick={() => {
                const dropdown = document.getElementById("mobile-treatments-dropdown");
                dropdown?.classList.toggle("hidden");
              }}
            >
              Treatments <ChevronDown className="h-4 w-4" />
            </button>
            <div className="hidden pl-4 space-y-2 pt-2 pb-2" id="mobile-treatments-dropdown">
              {treatments.map((treatment) => (
                <Link
                  key={treatment.href}
                  href={treatment.href}
                  className="block py-1 text-secondary hover:text-secondary/80"
                  onClick={closeMobileMenu}
                >
                  {treatment.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/products"
            className="block py-2 text-secondary hover:text-secondary/80 font-medium border-b border-gray-100"
            onClick={closeMobileMenu}
          >
            Products
          </Link>

          <Link
            href="/gallery"
            className="block py-2 text-secondary hover:text-secondary/80 font-medium border-b border-gray-100"
            onClick={closeMobileMenu}
          >
            Gallery
          </Link>

          <Link
            href="/pricing"
            className="block py-2 text-secondary hover:text-secondary/80 font-medium border-b border-gray-100"
            onClick={closeMobileMenu}
          >
            Pricing
          </Link>

          <Link
            href="/about"
            className="block py-2 text-secondary hover:text-secondary/80 font-medium border-b border-gray-100"
            onClick={closeMobileMenu}
          >
            About
          </Link>

          <Link
            href="/contact"
            className="block py-2 text-secondary hover:text-secondary/80 font-medium border-b border-gray-100"
            onClick={closeMobileMenu}
          >
            Contact
          </Link>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => {
                openCart();
                closeMobileMenu();
              }}
              className="text-secondary hover:text-secondary/80 relative"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
            <Button
              asChild
              variant="default"
              className="bg-secondary hover:bg-secondary/90"
              onClick={closeMobileMenu}
            >
              <Link href="/booking">{settings?.bookingEnabled ? "Book Now" : "Bookings Disabled"}</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}