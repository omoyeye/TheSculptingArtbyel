import { ReactNode, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import CartSidebar from "./CartSidebar";
import { useStore } from "@/lib/store";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const { cartOpen, setCartOpen } = useStore();

  // Close cart when ESC key is pressed
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setCartOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [setCartOpen]);

  // Prevent body scrolling when cart is open
  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [cartOpen]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
      <CartSidebar />
    </div>
  );
}
