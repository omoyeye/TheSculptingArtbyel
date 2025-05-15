import { Switch, Route } from "wouter";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Treatments from "@/pages/Treatments";
import TreatmentDetail from "@/pages/TreatmentDetail";
import Products from "@/pages/Products";
import ProductDetail from "@/pages/ProductDetail";
import Gallery from "@/pages/Gallery";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Booking from "@/pages/Booking";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";
import { useStore } from "@/lib/store";

function App() {
  const { initializeCart } = useStore();

  useEffect(() => {
    // Initialize cart state from localStorage when app loads
    initializeCart();
  }, [initializeCart]);

  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/treatments" component={Treatments} />
        <Route path="/treatments/:id" component={TreatmentDetail} />
        <Route path="/products" component={Products} />
        <Route path="/products/:id" component={ProductDetail} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/booking" component={Booking} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
