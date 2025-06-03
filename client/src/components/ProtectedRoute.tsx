import { useAuth } from "@/contexts/AuthContext";
import { useLocation } from "wouter";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, checkAuth } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    const authValid = checkAuth();
    if (!authValid) {
      setLocation("/admin-login");
    }
  }, [checkAuth, setLocation]);

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}