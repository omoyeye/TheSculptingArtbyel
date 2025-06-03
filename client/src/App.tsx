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
import Pricing from "@/pages/Pricing";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import AdminDashboard from "@/pages/AdminDashboard";
import AdminLogin from "@/pages/AdminLogin";
import NotFound from "@/pages/not-found";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import ImageTest from "@/components/ImageTest";

function AppRoutes() {
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
        <Route path="/pricing" component={Pricing} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/terms" component={Terms} />
        <Route path="/admin-login">
          {() => <AdminLogin onLogin={() => {}} />}
        </Route>
        <Route path="/admin">
          {() => (
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/admin-dashboard">
          {() => (
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          )}
        </Route>
        <Route path="/image-test" component={ImageTest} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
